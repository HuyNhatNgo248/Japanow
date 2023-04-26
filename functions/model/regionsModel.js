const mongoose = require("mongoose");

const RegionsSchema = new mongoose.Schema(
  {
    regionId: {
      type: String,
      trim: true,
      required: true,
    },
    regionType: {
      type: String,
      enum: ["CITY", "NEIGHBORHOOD", "POI"],
    },

    cityName: {
      type: String,
      required: true,
      unique: true,
    },

    regionNames: {
      fullName: String,
      shortName: String,
      displayName: String,
      primaryDisplayName: String,
      secondaryDisplayName: String,
      lastSearchName: String,
    },

    essId: {
      sourceName: String,
      sourceId: String,
    },

    coordinates: {
      type: ["Point"],
    },

    hierarchyInfo: {
      country: {
        name: String,
        isoCode2: String,
        isoCode3: String,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

RegionsSchema.index({
  coordinates: "2dsphere",
});

const Regions = mongoose.model("Regions", RegionsSchema);
module.exports = Regions;
