import * as model from "../model.js";
import HotelNavView from "../views/hotelView/hotelNavView.js";
import HotelOtherView from "../views/hotelView/hotelOtherView.js";
import HotelResultView from "../views/hotelView/hotelResultView.js";
import { catchAsync } from "../helpers.js";

const controlPropertyItems = async (searchQuery) => {
  const data = await model.getProperties(searchQuery);
  if (!data) return HotelResultView.renderDefaultPropertyCard();
  HotelResultView.renderResultPreview(data.total);
  HotelResultView.renderPropertyCard(data.data);
  HotelResultView.renderUpdatePagination(data.total);
};

catchAsync(async function () {
  await HotelResultView.addHandlerRenderProperties(controlPropertyItems);
})();
