const load = async function () {
  let routes = window.location.pathname;
  if (routes === "/") {
    await import("./controllers/overviewController.js");
    await import("./controllers/accordionController.js");
    await import("./controllers/searchBarController.js");
  } else if (routes === "/hotels") {
    await import("./controllers/hotelsController.js");
    await import("./controllers/accordionController.js");
    await import("./controllers/searchBarController.js");
  } else {
    await import("./controllers/accordionController.js");
    await import("./controllers/searchBarController.js");
  }
};

load();
