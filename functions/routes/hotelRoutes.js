const express = require("express");
const router = express.Router();
const hotelController = require("./../controllers/hotelController");

router.get("/cities", hotelController.getAllCities);
router.get("/city", hotelController.getCity);

router.get("/hotels", hotelController.getCity, hotelController.getHotels);

// /hotels?minDist=0&maxDist=50&sort=Distance&star=3&offers=free_cancel&languages=Japanese,English&page=1&limit=30&cityName=Kyoto

module.exports = router;
