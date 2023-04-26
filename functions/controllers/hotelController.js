const { catchAsync } = require("./../utils/catchAsync");
const Regions = require("./../model/regionsModel");
const Searches = require("./../model/searchesModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllCities = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Regions.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const data = await features.query;

  res.status(200).json({ status: "success", total: data.length, data });
});

exports.getCity = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Regions.find(), {
    cityName: "eq-" + req.query.cityName.toLowerCase(),
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const data = (await features.query)[0];

  if (!data)
    return res.status(404).json({
      status: "fail",
    });

  req.regionInfo = data;

  next();
});

exports.getHotels = catchAsync(async (req, res, next) => {
  const { regionInfo } = req;

  const { maxDist, minDist, sort, star, offers, languages, page, limit } =
    req.query;

  const aggregate = Searches.aggregate()
    .near({
      near: { type: "Point", coordinates: regionInfo.coordinates },
      distanceField: "distance",
      minDistance: minDist * 1000 || 0,
      maxDistance: maxDist * 1000 || 50 * 1000,
      distanceMultiplier: 0.001, //km
    })
    .lookup({
      from: "details",
      localField: "details",
      foreignField: "_id",
      as: "details",
    })
    .lookup({
      from: "reviews",
      localField: "reviews",
      foreignField: "_id",
      as: "reviews",
    })
    .lookup({
      from: "review summaries",
      localField: "summaries",
      foreignField: "_id",
      as: "summaries",
    })
    .unwind("reviews", "summaries", "details");

  offers?.split(",").forEach((el) =>
    aggregate.match({
      "offerSummary.offerType": { $eq: el.replaceAll("-", "_").toUpperCase() },
    })
  );

  languages?.split(",").forEach((el) =>
    aggregate.match({
      "details.summary.amenities.contents.items": {
        $eq: el.replaceAll("-", " "),
      },
    })
  );

  star &&
    aggregate.match({
      $expr: {
        $or: star
          .split(",")
          .map((el) => [+el, +el + 0.5])
          .flat()
          .map((el) => {
            return {
              $eq: [+el, "$star"],
            };
          }),
      },
    });

  aggregate
    .sort(_getSortObj(sort))
    .facet({
      data: [
        {
          $skip: ((page || 1) - 1) * limit,
        },
        {
          $limit: +limit || +process.env.DEFAULT_PROPERTIES_LIMIT,
        },
        {
          $project: {
            id: 1,
            regionId: 1,
            name: 1,
            coordinates: 1,
            neighborhood: 1,
            offerSummary: 1,
            attributes: 1,
            currentInfo: 1,
            star: 1,
            details: 1,
            reviews: 1,
            summaries: 1,
            distance: 1,
            cityCenter: 1,
          },
        },
      ],
      total: [{ $count: "total" }],
    })
    .addFields({
      total: { $first: "$total.total" },
    });

  const hotels = await aggregate;

  res.status(200).json({
    status: "success",
    centerCoords: regionInfo.coordinates,
    total: hotels[0].total,
    data: hotels[0].data,
  });

  function _getSortObj(sort) {
    sort = sort.replaceAll(" ", "-");
    switch (sort) {
      case "Hotel-class":
        return { star: -1 };
      case "Review":
        return {
          "summaries.totalCount": -1,
        };
      case "Distance":
        return { distance: 1 };
    }
  }
});
