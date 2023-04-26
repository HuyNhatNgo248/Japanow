import * as model from "../model.js";
import TourRecView from "../views/overviewView/tourRecView.js";
import MapBox from "../views/overviewView/mapboxView.js";
import { catchAsync } from "../helpers.js";

const controlRenderActivitiesImages = catchAsync(async function (arrAct) {
  return this.renderActivitiesImages(await model.getActivitiesImages(arrAct));
});

const controlMapCard = catchAsync(async function (cities) {
  const data = await model.getMostPopulatedCities(cities);
  return this.renderMapBoxCard(data);
});

const controlMapMarkup = catchAsync(async function (location) {
  const locations = await model.getPointsOfInterest(location);
  return this.renderPointsOfInterest(locations);
});

const controlLoadingPopupContent = catchAsync(async function (locationId) {
  const data = await model.getPointsOfInterestDetails(locationId);
  return this.renderMapBoxPopupContent(data);
});

//init
catchAsync(async function () {
  await TourRecView.addHandlerRenderImages(controlRenderActivitiesImages);
  await MapBox.addHandlerRenderMapCard(controlMapCard);
  await MapBox.addHandlerUpdateMapBox(controlMapMarkup);
  await MapBox.addHandlerLoadingPopupContent(controlLoadingPopupContent);
})();
