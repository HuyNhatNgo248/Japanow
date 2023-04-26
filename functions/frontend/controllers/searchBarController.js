import * as model from "../model.js";
import SearchBar from "../components/searchBar.js";
import { catchAsync } from "../helpers.js";

const controlSearchBarInfo = catchAsync(async function () {
  const data = await model.getRegions();
  return SearchBar.renderAutoSuggestion(data);
});

catchAsync(async function () {
  await SearchBar.addHandlerRenderSearchBar(controlSearchBarInfo);
})();
