import axios from "axios";

export const AJAX = async (method, url) => {
  try {
    const pro = await axios({
      method,
      url,
    });
    return pro.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPosition = function () {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

export const catchAsync = function (fn) {
  return function () {
    return fn.apply(this, arguments).catch((err) => console.log(err));
  };
};

export const goToPage = function (path) {
  return (window.location.href = path);
};
