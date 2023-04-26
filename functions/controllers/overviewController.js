const axios = require("axios");
const { catchAsync, catchAsyncHelper } = require("./../utils/catchAsync");
const Regions = require("./../model/regionsModel");
const { createClient } = require("pexels");
const { createApi } = require("unsplash-js");

exports.getActivitiesImages = catchAsync(async (req, res, next) => {
  let data = await _getImagesPexels("Japan", req.params.searchTerms.split(","));

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getMostPopulatedCitiesImages = catchAsync(async (req, res, next) => {
  const arrDests = req.params.searchTerms.split(",");

  const data = await _getImagesPexels("city", arrDests);
  // const data = await _getImagesUnsplash("", arrDests);

  const cityCoords = await Promise.all(
    arrDests.map((el) =>
      Regions.findOne({ cityName: el }).select("cityName coordinates -_id")
    )
  );

  data.forEach((_, idx) => {
    data[idx]["cityName"] = arrDests[idx];
    data[idx]["location"] = {
      lat: cityCoords[idx].coordinates[1],
      lng: cityCoords[idx].coordinates[0],
    };
  });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getPointsOfInterest = catchAsync(async (req, res, next) => {
  const pro = await axios({
    method: "get",
    url: `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${req.params.searchTerms}&category=${req.params.category}&latLong=${req.params.latlng}&radius=${process.env.DEFAULT_RADIUS}&radiusUnit=km&language=en`,
    headers: {
      accept: "application/json",
      Referer: "https://omnifood-hngo.netlify.app",
    },
  });

  res.status(200).json({
    status: "success",
    data: await pro.data.data,
  });
});

exports.getPointsOfInterestDetails = catchAsync(async (req, res, next) => {
  const data = (
    await Promise.all([
      getTripAdvisorPromises("details", req.params.locationId),
      getTripAdvisorPromises("photos", req.params.locationId),
    ])
  ).map((el) => el.data);

  res.status(200).json({
    status: 200,
    data: {
      details: data[0],
      photos: data[1].data[0],
    },
  });

  function getTripAdvisorPromises(endpoint, locationId) {
    return axios({
      method: "get",
      url: `https://api.content.tripadvisor.com/api/v1/location/${locationId}/${endpoint}?key=${process.env.TRIPADVISOR_API_KEY}&language=en&currency=USD`,
      headers: {
        accept: "application/json",
        Referer: "https://omnifood-hngo.netlify.app",
      },
    });
  }
});

const _getImagesUnsplash = catchAsyncHelper(async (searchTerms, arr) => {
  const serverApi = createApi({
    accessKey: process.env.UNSPLASH_CLIENT_ID,
  });

  const proArr = arr.map((query) =>
    serverApi.search.getPhotos({
      query: `${query} ${searchTerms}`,
      orientation: "landscape",
      page: 1,
      perPage: 5,
    })
  );

  const data = (await Promise.all(proArr)).map((el) => {
    const imageObj = el.response.results.sort((a, b) => b.likes - a.likes)[0];

    return {
      description: imageObj.alt_description,
      url: imageObj.urls.regular,
    };
  });

  return data;
});

const _getImagesPexels = catchAsyncHelper(async (searchTerms, arr) => {
  const client = createClient(process.env.PEXELS_CLIENT_ID);

  const proArr = arr.map((query) =>
    client.photos.search({
      query: `${query} ${searchTerms}`,
      orientation: "landscape",
      per_page: 2,
    })
  );

  const data = (await Promise.all(proArr)).map((el) => {
    return {
      description: el.photos[1].alt,
      url: el.photos[1].src.medium,
    };
  });

  return data;
}, _getImagesUnsplash);
