import View from "../view.js";
import { DEFAULT_REGION } from "../../config.js";
export default class HotelView extends View {
  _navBar = document.querySelector(".nav-bar-1");
  _hotelDisplay = document.querySelector(".hotel-display");

  constructor() {
    super();
    this.searchRegion =
      new URLSearchParams(window.location.search).get("region") ||
      DEFAULT_REGION;
  }

  getStyle(domNode, property = "display") {
    return window.getComputedStyle(domNode).getPropertyValue(property);
  }
}
