const express = require("express");
// const morgan = require("morgan");
const compression = require("compression");
const hpp = require("hpp");

const path = require("path");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const viewRouter = require("./routes/viewRoutes");
const overviewRouter = require("./routes/overviewRoutes");
const hotelRouter = require("./routes/hotelRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, `/views`));
app.use(express.static(`./../public`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
);
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
app.use(hpp());

const limiter = rateLimit({
  max: process.env.NODE_ENV === "production" ? 100 : 5000, //100 req/hr
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);
app.use("/", viewRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/overview", overviewRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
