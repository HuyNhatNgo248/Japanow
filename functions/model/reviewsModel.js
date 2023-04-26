const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "A review must be for a hotel which must have an ID"],
      unique: true,
      trim: true,
    },

    reviews: [
      {
        brandType: String,
        reviewScoreWithDescription: String,
        submissionTimeLocalized: Date,
        title: String,
        text: String,
        photos: [
          {
            __typename: String,
            description: {
              type: String,
              trim: true,
              maxLength: [
                1000,
                "Photo description should be as informative and consise as possible",
              ],
            },
            aspectRatio: String,
            url: String,
            thumbnailClickAnalytics: String,
          },
        ],
        stayDuration: String,
        managementResponses: {
          text: String,
          response: String,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
