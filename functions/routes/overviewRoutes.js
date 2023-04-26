const express = require("express");
const router = express.Router();
const apiController = require("../controllers/overviewController");

router.get(
  "/images/things-to-do/:searchTerms",
  apiController.getActivitiesImages
);

router.get(
  "/images/biggiest-cities/:searchTerms",
  apiController.getMostPopulatedCitiesImages
);

router.get(
  "/points-of-interest/:searchTerms/:category/:latlng",
  apiController.getPointsOfInterest
);

router.get(
  "/points-of-interest/details/:locationId",
  apiController.getPointsOfInterestDetails
);

module.exports = router;
