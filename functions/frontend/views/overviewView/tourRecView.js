import View from "../view";
import { DEFAULT_ACTIVITIES } from "../../config";
class TourRecView extends View {
  _title = document
    .querySelector(".popular-destinations")
    .querySelector(".small-card-header");
  _galleryItems = document.querySelectorAll(".gallery__item");

  constructor() {
    super();
  }

  async addHandlerRenderImages(handler) {
    return await handler.call(this, [...DEFAULT_ACTIVITIES.keys()]);
  }

  renderActivitiesImages(data) {
    let idx = 0;
    for (const [key, val] of DEFAULT_ACTIVITIES) {
      const item = this._galleryItems[idx];

      item.insertAdjacentHTML(
        "afterbegin",
        `<img src='' alt=''>
        <figcaption class='gallery__item--description'>
          <span class='gallery__item--location'></span>
        </figcaption>`
      );

      const itemInfo = data[idx];
      const imgLink = item.querySelector("img");
      imgLink.src = itemInfo.url;
      imgLink.alt = itemInfo.description;

      item.querySelector(
        ".gallery__item--location"
      ).textContent = `${val} ${key}`;

      this.removeLoadingSpinner(item);

      idx++;
    }
  }
}

export default new TourRecView();
