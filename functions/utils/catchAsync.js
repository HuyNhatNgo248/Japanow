exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

exports.catchAsyncHelper = (fn, fb) => {
  return function () {
    const args = arguments;

    return fn.apply(this, args).catch((err) => {
      //execute fallback
      if (fb) return fb.apply(this, args);
      console.log(err);
    });
  };
};
