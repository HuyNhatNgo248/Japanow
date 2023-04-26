const express = require("express");
const router = express.Router();
const viewController = require("./../controllers/viewController");

router.get("/", viewController.getOverview);
router.get("/hotels", viewController.getHotels);

module.exports = router;
