const mongoose = require("mongoose");

const ReviewSummariesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Hotel details must contain an ID"],
      unique: true,
      trim: true,
    },

    averageOverallRating: Number,
    averageOverallRating: Number,
    cleanliness: Number,
    hotelCondition: Number,
    roomComfort: Number,
    serviceAndStaff: Number,
    totalCount: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const ReviewSummaries = mongoose.model(
  "Review summaries",
  ReviewSummariesSchema
);
module.exports = ReviewSummaries;
