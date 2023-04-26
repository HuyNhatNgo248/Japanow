exports.getOverview = (req, res, next) => {
  res.status(200).render("./overview/overview", {
    title: "",
  });
};

exports.getHotels = (req, res, next) => {
  res.status(200).render("./hotels/hotels", {
    title: "| Hotel booking",
  });
};
