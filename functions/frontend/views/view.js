export default class View {
  constructor() {}

  removeLoadingSpinner(item) {
    item.querySelector(".lds-ring").remove();
  }

  addLoadingSpinner(item) {
    item.insertAdjacentHTML(
      "beforeend",
      `
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`
    );
  }
}
