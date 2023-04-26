import HotelView from "./hotelView";
import { goToPage } from "../../helpers";
import {
  DEFAULT_PROPERTY_SKELETON,
  DEFAULT_PROPERTIES_LIMIT,
} from "../../config";

class HotelResultView extends HotelView {
  _imageSlidesContainer;
  _dropdownContent = document
    .querySelector(".sort-results")
    .querySelector(".dropdown--content");
  _dropdownBtn = this._hotelDisplay.querySelector(".btn--dropdown");

  _formContainer = document.querySelector(".form__container");
  _resultsContainer = document.querySelector(
    ".hotel-display__results--container"
  );
  _resultsCount = document.querySelector(".results-count");
  _sort = "Hotel class";

  _distanceSlider = document.getElementById("distance_from");

  _languagesCheckbox = document
    .getElementById("language_supported")
    .querySelectorAll(".checkbox__container");

  _starsCheckbox = document
    .getElementById("stars")
    .querySelectorAll(".checkbox__container");

  _offersCheckbox = document
    .getElementById("offers")
    .querySelectorAll(".checkbox__container");

  _query = {
    region: this.searchRegion,
    sort: this._sort,
  };

  _page = 1;
  _paginationContainer = document.querySelector(".hotel-display__pagination");
  _paginationForm =
    this._paginationContainer.querySelector(".pagination__form");
  _pagBtnPrev = this._paginationContainer.querySelector(".btn-prev");
  _pagBtnNext = this._paginationContainer.querySelector(".btn-next");
  _pagTotal = this._paginationContainer.querySelector(".pagination__total");
  _pagInput = this._paginationContainer.querySelector(".form__input");

  constructor() {
    super();
    this._updateDropdown();
    this._openDropdown();
    this._updateSlider();
    this._updateCheckBox();
    this._updatePagination();
  }

  async addHandlerRenderProperties(handler) {
    this._handler = handler;
    handler.call(this, this._query);
  }

  _callHandler() {
    document.querySelector(".nav-bar-1").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    this._resultsContainer.innerHTML = "";
    this._renderSkeleton();
    this._data = null;
    this._handler.call(this, this._query);
  }

  _setImageSliderDefault() {
    document.querySelectorAll(".img__container").forEach((ctn) => {
      const slides = ctn.querySelectorAll(".hotel-display__img");
      const maxSlide = slides.length;
      let curSlide = 0;
      goToSlide(0);

      const btnLeft = ctn.querySelector(".btn-left");
      const btnRight = ctn.querySelector(".btn-right");
      btnLeft.addEventListener("click", (_) => {
        prevSlide(curSlide);
      });

      btnRight.addEventListener("click", (_) => {
        nextSlide(curSlide);
      });

      function goToSlide(slide) {
        slides.forEach(
          (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
      }

      function nextSlide(cur) {
        if (cur === maxSlide - 1) {
          curSlide = 0;
        } else {
          curSlide++;
        }

        goToSlide(curSlide);
      }

      function prevSlide(cur) {
        if (cur === 0) {
          curSlide = maxSlide - 1;
        } else {
          curSlide--;
        }
        goToSlide(curSlide);
      }
    });
  }

  _updateSlider() {
    this._distanceSlider
      .querySelector("input")
      .addEventListener("change", async (e) => {
        this._query["maxDist"] = e.target.value;
        this._callHandler.call(this);
      });
  }

  _updatePagination() {
    this._paginationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this._data) return;
      const val = e.target.querySelector(".form__input").value;
      getPage.call(this, +val);
    });

    this._pagBtnPrev.addEventListener("click", (e) => {
      if (!this._data) return;
      if (this._page === 1) return;
      getPage.call(this, this._page - 1);
    });

    this._pagBtnNext.addEventListener("click", (e) => {
      if (!this._data) return;
      if (this._page === this._maxPage) return;
      getPage.call(this, this._page + 1);
    });

    function getPage(page) {
      const checkedVal =
        isNaN(page) || page < 1 || page > this._maxPage ? 1 : page;

      checkedVal > 1
        ? this._pagBtnPrev.classList.add("btn-active")
        : this._pagBtnPrev.classList.remove("btn-active");

      checkedVal === this._maxPage
        ? this._pagBtnNext.classList.remove("btn-active")
        : this._pagBtnNext.classList.add("btn-active");

      this._page = checkedVal;
      this._query["page"] = this._page;
      this._callHandler.call(this);
    }
  }

  _updateCheckBox() {
    this._languagesCheckbox.forEach((el) =>
      el.addEventListener("change", (e) => update.call(this, e))
    );

    this._starsCheckbox.forEach((el) =>
      el.addEventListener("change", (e) => update.call(this, e))
    );

    this._offersCheckbox.forEach((el) =>
      el.addEventListener("change", (e) => update.call(this, e))
    );

    function update(e) {
      if (!this._data) return; //ignore change when data hasn't arrived
      const boxChecked =
        e.target.closest(".wrapper").nextElementSibling.textContent;

      const key = e.target
        .closest(".accordion-df__panel--item")
        .getAttribute("id");

      updateQuery.call(this, key, boxChecked, e.target.checked);
      this._callHandler.call(this);
    }

    function updateQuery(key, boxChecked, checked) {
      const queryHelper = function (field) {
        const val = field === "star" ? boxChecked.at(0) : boxChecked;
        if (!checked) {
          const arr = this._query[field].split(",");
          arr.splice(arr.indexOf(val), 1);
          if (arr.length === 0) return delete this._query[field];
          this._query[field] = arr.toString();
          return;
        }

        this._query[field]
          ? (this._query[field] += "," + val)
          : (this._query[field] = val);
      };

      switch (key) {
        case "stars":
          queryHelper.call(this, "star");
          break;
        case "language_supported":
          queryHelper.call(this, "languages");
          break;
        case "offers":
          queryHelper.call(this, "offers");
          break;
      }
    }
  }

  _openDropdown() {
    this._dropdownBtn.addEventListener("click", (e) => {
      const parent = e.target.closest(".dropdown");
      const content = parent.querySelector(".dropdown--content");
      const icon = parent.querySelector(".icon-dropdown");

      if (this.getStyle(content, "display") === "none") {
        content.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      } else {
        content.style.display = "none";
        icon.style.transform = "none";
      }
    });
  }

  _updateDropdown() {
    this._dropdownContent.addEventListener("click", (e) => {
      if (!this._data) return; //ignore change when data hasn't arrived

      const link = e.target.closest(".dropdown--options");

      const parent = link.closest(".dropdown");
      const content = parent.querySelector(".dropdown--content");
      const icon = parent.querySelector(".icon-dropdown");

      if (this.getStyle(content, "display") === "none") {
        content.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      } else {
        content.style.display = "none";
        icon.style.transform = "none";
      }

      parent.querySelector("span").textContent = link.textContent;
      if (this._sort === link.textContent) return;
      this.renderPropertyCard(this._sortResults(link.textContent));
    });
  }

  _sortResults(sortType) {
    this._sort = sortType;
    this._query["sort"] = this._sort;

    switch (sortType) {
      case "Distance":
        return this._data.sort((a, b) => +a.distance - +b.distance);

      case "Hotel class":
        return this._data.sort((a, b) => b.star - a.star);

      case "Review":
        return this._data.sort(
          (a, b) => b.summaries.totalCount - a.summaries.totalCount
        );
    }
  }

  renderDefaultPropertyCard() {
    return goToPage("hotels?region=Tokyo");
  }

  renderResultPreview(totalCount) {
    if (!totalCount)
      return this._resultsContainer.insertAdjacentHTML(
        "afterbegin",
        "<p>No results found 😢</p>"
      );

    this._resultsCount.querySelector(
      ".results-count__number"
    ).textContent = `${totalCount} hotel${totalCount > 1 ? "s" : ""} `;

    this._resultsCount.querySelector(
      ".results-count__number"
    ).nextElementSibling.textContent = "in";

    this._resultsCount.querySelector(".results-count__location").textContent =
      this.searchRegion;
  }

  renderUpdatePagination(totalCount) {
    this._maxPage = Math.ceil(totalCount / DEFAULT_PROPERTIES_LIMIT);
    this._pagTotal.textContent = this._maxPage;
    this._pagInput.placeholder = this._page;
    this._pagInput.value = "";
    this._pagInput.blur();
  }

  _renderSkeleton() {
    this._resultsCount.querySelector(".results-count__number").textContent =
      "Looking for hotels ";

    let html = "";

    for (let i = 0; i < DEFAULT_PROPERTY_SKELETON; i++) {
      html += `<div class="hotel-display__results">
          <div class="img__container skeleton skeleton__img"></div>
          <div class="listing__title">
            <div class="skeleton skeleton--text skeleton__text--big"></div>
          </div>
          <div class="listing__info">
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
          </div>
          <div class="listing-price">
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text"></div>
          </div>
        </div>`;
    }

    this._resultsContainer.insertAdjacentHTML("afterbegin", html);
  }

  renderPropertyCard(data) {
    this._data = data;
    this._resultsContainer.innerHTML = "";
    this._data?.forEach((el, idx) => {
      const html = `
      <div class="hotel-display__results">
        <div class="img__container">
          ${this._getImagesHTML(el.details.propertyGallery)}
          <button class="btn btn-left">
            <ion-icon class="icon" name="chevron-back-outline"></ion-icon>
          </button>
          <button class="btn btn-right">
            <ion-icon class="icon" name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
        <div class="listing__title">
          <span>${(this._page - 1) * 30 + (idx + 1)}. ${el.name}</span>
          <div class="hotel-star"> 
            <span class="star-container">
              ${this._getStarsHTML(el.star)}
            </span>
          </div>
        </div>
        <div class="listing__info"> 
          <div class="circle-rating--container">
            ${this._getReviewHTML(el.reviews.reviews, el.summaries)}
          </div>
          <p class="hotel-preview">
            ${el.details.summary.location.whatsAround
              .split(".")
              .slice(0, 2)
              .join(".")}.
          </p>

          <div class="offer-summary">
            <ion-icon class="icon" name="card-outline"></ion-icon>
            <p class="offer-message">${el.offerSummary[0].message}</p>
          </div>
          
          
        </div>
        <div class="listing-price"> 
          
          <button class="btn btn__add-to-cart">
            <a class="link-redirect" href="#">Show prices</a>
          </button>
          <p class="payment__info"> 
            Enter dates to see prices
          </p>
        </div>
      </div>
      `;

      this._resultsContainer.insertAdjacentHTML("beforeend", html);
    });

    this._setImageSliderDefault();
  }

  _getImagesHTML(gallery) {
    return gallery.slice(0, 10).map((el) => {
      return `<img class="hotel-display__img" src="${el.url}" alt="${el.alt}"/>`;
    });
  }

  _getStarsHTML(stars) {
    return Array(Math.floor(+stars))
      .fill(`<ion-icon class="icon" name="star"></ion-icon>`)
      .join("");
  }

  _getReviewHTML(reviews, summaries) {
    if (!reviews.length) return "";
    const review = getMostRecentReview(reviews);

    const circles = Array(
      convertReviewBase5(
        review.reviewScoreWithDescription.split(" ")[0].split("/")[0]
      )
    )
      .fill('<div class="circle-rating circle-rating--full"></div>')
      .join("");

    const comments = `<p class="review-comment">${review.reviewScoreWithDescription} <span>(${summaries.totalCount} reviews)</span></p>`;

    return circles + comments;

    function getMostRecentReview(reviews) {
      const review = reviews.sort(
        (a, b) =>
          new Date(b.submissionTimeLocalized).getTime() -
          new Date(a.submissionTimeLocalized).getTime()
      )[0];
      return review;
    }

    function convertReviewBase5(reviewScore) {
      return Math.floor(reviewScore * 0.5);
    }
  }
}

export default new HotelResultView();
