const sendErrorDev = (err, req, res) => {
  //API

  if (req.originalUrl.startsWith("/api")) {
    console.log("ERROR from DEVELOPMENT 😭😭😭😭😭😭", err);

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });

    //RENDERED WEBSITE
  } else {
    res.status(err.statusCode).render("error", {
      title: "404 not found",
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      console.log("ERROR from PRODUCTION 😭😭😭😭😭😭", err);
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.log("ERROR from PRODUCTION 😭😭😭😭😭😭", err);

    // 2) Send generic message
    return res.status(500).json({
      status: "404 not found",
      msg: "Please try again later.",
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render("error", {
      title: "404 not found",
      msg: "Please try again later.",
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.log("ERROR from PRODUCTION 😭😭😭😭😭😭", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "404 not found",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") sendErrorDev(err, req, res);
  else if (process.env.NODE_ENV === "production") sendErrorProd(err, req, res);
};
