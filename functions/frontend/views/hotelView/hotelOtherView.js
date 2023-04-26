import HotelView from "./hotelView";

class HotelOtherView extends HotelView {
  _hotelForm = document.querySelector(".hotel-form__container");
  _headerLocation = document
    .querySelector(".heading-secondary")
    .querySelector("p");
  _btnLocation = document
    .querySelector(".nav-bar-1__bottom")
    .querySelector(".btn__text");

  _btnCateLocation = document
    .querySelector(".nav-bar-1__bottom")
    .querySelector(".dropdown--content")
    .querySelectorAll(".dropdown--options__location");
  constructor() {
    super();
    this._updateTextLocation();
  }

  _updateTextLocation() {
    this._headerLocation.textContent = this.searchRegion;
    this._btnLocation.textContent = this.searchRegion;
    this._btnCateLocation.forEach(
      (btn) => (btn.textContent = this.searchRegion)
    );
  }
}

export default new HotelOtherView();
