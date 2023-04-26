const mongoose = require("mongoose");
const Details = require("./detailsModel");
const Reviews = require("./reviewsModel");
const ReviewSummaries = require("./reviewSummariesModel");

const searchesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Hotel must have an ID"],
      unique: true,
      trim: true,
    },
    regionId: {
      type: String,
      required: [true, "Region must have an ID"],
    },
    name: String,
    coordinates: {
      type: ["Point"],
    },
    neighborhood: String,
    offerSummary: [{ message: String, offerType: { type: String } }],
    attributes: [String],
    price: [
      {
        role: String,
        price: String,
      },
    ],
    currencyInfo: {
      currency: String,
      symbol: String,
    },
    star: Number,

    details: [{ type: mongoose.Schema.ObjectId, ref: "Details" }],

    reviews: [{ type: mongoose.Schema.ObjectId, ref: "Reviews" }],

    summaries: [{ type: mongoose.Schema.ObjectId, ref: "Review summaries" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

searchesSchema.index({ coordinates: "2dsphere" });

searchesSchema.pre("save", async function (next) {
  const [details, reviews, summaries] = await Promise.all([
    Details.find({ "summary.id": this.id }),
    Reviews.find({ id: this.id }),
    ReviewSummaries.find({ id: this.id }),
  ]);

  this.details = details[0]._id;
  this.reviews = reviews[0]._id;
  this.summaries = summaries[0]._id;
  next();
});

// searchesSchema.pre(/^find/, function (next) {
//   this.populate("details").populate("reviews").populate("summaries");
//   next();
// });

const Searches = mongoose.model("Searches", searchesSchema);
module.exports = Searches;
