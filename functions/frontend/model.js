import { AJAX, catchAsync } from "./helpers";
import {
  DEFAULT_SORT,
  DEFAULT_REGION,
  DEFAULT_MIN_DIST,
  DEFAULT_MAX_DIST,
  DEFAULT_PROPERTIES_LIMIT,
} from "./config.js";

import axios from "axios";

export const getActivitiesImages = catchAsync(async function (arr) {
  return AJAX("get", `/api/v1/overview/images/things-to-do/${arr.toString()}`);
});

export const getMostPopulatedCities = catchAsync(async (cities) => {
  const data = await AJAX(
    "get",
    `/api/v1/overview/images/biggiest-cities/${cities.toString()}`
  );

  return data;
});

export const getPointsOfInterest = catchAsync(async function (location) {
  const { lat, lng } = location;

  const data = await AJAX(
    "get",
    `/api/v1/overview/points-of-interest/attractions/attractions/${lat},${lng}`
  );
  return data;
});

export const getPointsOfInterestDetails = catchAsync(async function (
  locationId
) {
  const data = await AJAX(
    "get",
    `/api/v1/overview/points-of-interest/details/${locationId}`
  );
  return data;
});

export const getRegions = catchAsync(async () => {
  const data = await AJAX(
    "get",
    `/api/v1/hotels/cities?fields=cityName,regionNames`
  );

  return data;
});

export const getProperties = catchAsync(async (searchQuery) => {
  const {
    region,
    sort,
    minDist,
    maxDist,
    star,
    offers,
    languages,
    limit,
    page,
  } = searchQuery;

  //base url
  let url = `/api/v1/hotels/hotels?minDist=${
    minDist || DEFAULT_MIN_DIST
  }&maxDist=${maxDist || DEFAULT_MAX_DIST}&sort=${sort || DEFAULT_SORT}&limit=${
    limit || DEFAULT_PROPERTIES_LIMIT
  }&page=${page || 1}&cityName=${region || DEFAULT_REGION}`;

  if (star) url += `&star=${star}`;
  if (offers) url += `&offers=${offers.replaceAll(" ", "-")}`;
  if (languages) url += `&languages=${languages.replaceAll(" ", "-")}`;

  const pro = await axios({
    method: "get",
    url,
  });
  return pro.data;
});
