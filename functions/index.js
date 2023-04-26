const functions = require("firebase-functions");
const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const { catchAsyncHelper } = require("./utils/catchAsync");

dotenv.config({ path: "./config.env" });

catchAsyncHelper(async () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection successful");
    });
})();

exports.japanow = functions.https.onRequest(app);
