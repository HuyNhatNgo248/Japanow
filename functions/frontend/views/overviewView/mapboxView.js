import View from "../view.js";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { catchAsync, goToPage } from "../../helpers.js";

import {
  DEFAULT_CITIES,
  MAPBOX_ACCESS_TOKEN,
  DEFAULT_MAP_LOCATION,
  LIMIT_FORWARD_GEOCODE,
} from "../../config.js";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

class MapBox extends View {
  _mapDOM = document.getElementById("map");
  _cardList = document.querySelector(".map-info__list");
  _pointsOfInterest = new Array(7); //caching
  _defaultLoaded = false;
  _curNavButtonId = 0;
  _map;
  _navButtons;
  _data;
  _activePopup;
  _curLocationId;

  constructor() {
    super();
  }

  async addHandlerRenderMapCard(handler) {
    return await handler.call(this, [...DEFAULT_CITIES.keys()]);
  }

  async addHandlerRenderMarkup(handler) {
    return await handler.call(this);
  }

  async addHandlerUpdateMapBox(handler) {
    if (!this._defaultLoaded) {
      const locations = await handler.call(this, DEFAULT_MAP_LOCATION);
      this._defaultLoaded = true;
      this._pointsOfInterest[0] = locations;
    }

    this._navButtons.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        this._updateMapBox(e.target.closest(".btn--navigation"));

        this._curNavButtonId = btn.dataset.id;

        if (!this._pointsOfInterest[btn.dataset.id]) {
          const locations = await handler.call(
            this,
            this._data[btn.dataset.id].location
          );

          this._pointsOfInterest[btn.dataset.id] = locations;
        } else {
          this.renderPointsOfInterest(this._pointsOfInterest[btn.dataset.id]);
        }
      })
    );
  }

  async addHandlerLoadingPopupContent(handler) {
    this._mapDOM.addEventListener("click", async (e) => {
      if (!this._activePopup || this._isOpenPopup) {
        return;
      }

      if (e.target.classList.contains("mapboxgl-popup-close-button")) {
        this._activePopup.remove();
        return;
      }

      if (
        !this._pointsOfInterest[this._curNavButtonId][this._activePopup.id].info
      ) {
        const info = await handler.call(this, this._curLocationId);
        this._pointsOfInterest[this._curNavButtonId][
          this._activePopup.id
        ].info = info;
      } else {
        this.renderMapBoxPopupContent(
          this._pointsOfInterest[this._curNavButtonId][this._activePopup.id]
            .info
        );
      }

      this._isOpenPopup = true;
    });
  }

  renderMapBoxPopupContent(data) {
    const { details, photos } = data;
    const html = `
        <div>
          <figure class="mapboxgl-popup__img--container">
            <img class="mapboxgl-popup__img" src="${
              photos.images.original.url
            }" alt="${details.name} photo">
          </figure>

          <div class="mapboxgl-popup__text">
            <p class="mapboxgl-popup__text--title">${details.name}</p>
            <div class="mapboxgl-popup__text--description">
              <div class="mapboxgl-popup__text--rating">
                <div class="circle-rating--container">
                  ${this._calculateAverageReview(
                    details.review_rating_count,
                    details.num_reviews
                  )
                    .map((el) => {
                      if (el === "full")
                        return '<div class="circle-rating circle-rating--full"></div>';
                      else if (el === "half")
                        return '<div class="circle-rating circle-rating--half"></div>';
                      else return '<div class="circle-rating"></div>';
                    })
                    .join("")}
                </div>
                    
                <p class="rating-count">${details.num_reviews}</p>
              </div>
              <div class="mapboxgl-popup__text--category">${
                details.category.name
              }</div>
             <button class="btn btn--like">
              <ion-icon name="heart" class="icon icon--like"></ion-icon>
             </button>

            </div>

          </div>
              
        </div>`;

    this._activePopup.setHTML(html).addTo(this._map);

    return data;
  }

  _calculateAverageReview(review_rating_count, num_reviews) {
    let sum = 0;

    for (const star in review_rating_count)
      sum += +star * review_rating_count[star];

    const avg = sum / num_reviews;

    const arrFill = Array(Math.floor(avg)).fill("full");

    if (Math.abs(Math.round(avg) - avg) > 0.25) {
      arrFill.push("half");
    }

    for (let i = arrFill.length; i < 5; i++) {
      arrFill.push("empty");
    }

    return arrFill;
  }

  renderMapBoxCard(data) {
    const arr = [...DEFAULT_CITIES.entries()];
    const html = data
      .map((el, idx) => {
        return `
        <div class="map-info__item">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img class="flip-card-img" src="${el.url}" alt="${el.description}">
              </div>
              <div class="flip-card-back">
                <div class="flip-card-content">
                  <p class="content__text">
                    <span class="content__header">${arr[idx][0]}</span>
                    ${arr[idx][1]} ⛩️</p>
                </div>
              </div>
            </div>
          </div>
          
      
      
          <button class="btn btn--navigation" data-id="${idx}">
            <ion-icon name="compass-outline" class="icon icon--navigation"></ion-icon>
          </button>
          <div class="map-info__item--description">
              <div class="map-info__item--title">${el.cityName}</div>
              <button class="btn btn--frame">Explore now</button>
              <button class="btn btn--frame btn-hotel-search">Hotel search</button>
              <button class="btn btn--frame">Things to do</button>
          </div>
        </div>
      `;
      })
      .join("");

    this._cardList.innerHTML = "";
    this._cardList.insertAdjacentHTML("afterbegin", html);

    this._data = data;

    this._navButtons = document.querySelectorAll(".btn--navigation");

    this._updateMapBox(document.querySelector(".btn--navigation"), 0);

    this._hotelsRedirect();
  }

  renderPointsOfInterest(locations) {
    const set = new Set();

    locations.forEach(
      catchAsync(async (loc, idx) => {
        const mapboxClient = mapboxSdk({ accessToken: MAPBOX_ACCESS_TOKEN });

        const coords = (
          await mapboxClient.geocoding
            .forwardGeocode({
              query: loc.address_obj.address_string,
              autocomplete: false,
              limit: LIMIT_FORWARD_GEOCODE,
            })
            .send()
        ).body.features;

        let lnglat = coords[0].center;

        //handle overlaping coordinates
        for (let i = 0; i < LIMIT_FORWARD_GEOCODE; i++) {
          if (!set.has(coords[i].center.toString())) {
            lnglat = coords[i].center;
            set.add(coords[i].center.toString());
            break;
          }
        }

        const popup = new mapboxgl.Popup({
          offset: 30,
          closeButton: false,
        }).setHTML(`
      <div>
        <figure class="mapboxgl-popup__img--container">
          <img class="mapboxgl-popup__img skeleton">
        </figure>

        <div class="mapboxgl-popup__text">
          <p class="mapboxgl-popup__text--title">${loc.name}</p>
          <div class="mapboxgl-popup__text--description">
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
          </div>
        </div>
             
      </div>`);

        //set id for caching
        popup.id = idx;

        popup.on("open", (e) => {
          this._activePopup = e.target;
          this._curLocationId = loc.location_id;
        });

        popup.on("close", (e) => {
          this._activePopup = null;
          this._curLocationId = null;
          this._isOpenPopup = false;
        });

        //add marker
        new mapboxgl.Marker({})
          .setLngLat(lnglat)
          .setPopup(popup)
          .addTo(this._map);
      })
    );
    return locations;
  }

  _updateMapBox(btnNav, id) {
    if (id === undefined) id = btnNav.dataset.id;

    this._navButtons.forEach((btn) =>
      btn.querySelector(".icon--navigation").classList.remove("active")
    );

    //set active button
    btnNav.querySelector(".icon--navigation").classList.add("active");

    //display loading spinner
    this.addLoadingSpinner(this._mapDOM);

    //render mapbox with new location
    this._renderMapBox(this._data[id].location);
  }

  _renderMapBox(data = DEFAULT_MAP_LOCATION) {
    const { lat, lng } = data;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/nnhyu248/cleasf7nl000901mnvkkk19ym",
      center: [lng, lat],
      zoom: 10,
    });

    this.removeLoadingSpinner(this._mapDOM);
    this._map = map;
    return map;
  }

  _hotelsRedirect() {
    document.querySelectorAll(".btn-hotel-search").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const link = e.target
          .closest(".map-info__item--description")
          .querySelector(".map-info__item--title");

        if (!link) return;

        goToPage(`/hotels?region=${link.textContent}`);
      })
    );
  }
}

export default new MapBox();
