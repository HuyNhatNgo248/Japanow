import { goToPage } from "../helpers.js";
class SearchBar {
  _modals = document.querySelectorAll(".display-modal");
  _overlay = document.querySelector(".overlay");
  _trieRoot = null;
  _searchResults = null;
  _modalInput = document.querySelector(".location-search__input");
  _modalContainer = document.querySelector(".location-search__suggestion");
  _form = document.querySelector(".location-search__form");
  _regions = new Map();

  constructor() {
    this._displayModal();
    this._closeModal();
    this._submitModal();
  }

  async addHandlerRenderSearchBar(handler) {
    return await handler.call(this);
  }

  _displayModal() {
    this._modals?.forEach((modal) =>
      modal.addEventListener("click", (e) => {
        const modal = e.target.closest("body").querySelector(".modal");
        const overlay = modal.nextElementSibling;

        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      })
    );
  }

  _closeModal() {
    this._overlay?.addEventListener("click", (e) => {
      const overlay = e.target.closest(".overlay");
      const modal = overlay.previousElementSibling;

      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    });
  }

  _submitModal() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      goToPage(
        `${window.location.origin}/hotels?region=${this._searchResults[0]}`
      );
    });

    this._modalContainer.addEventListener("click", (e) => {
      const link = e.target
        .closest(".suggestion__item")
        .querySelector(".suggestion__item--title");

      if (!link) return;

      goToPage(`hotels?region=${link.textContent}`);
    });
  }

  _buildTrie(data) {
    function Trie() {
      this.completeString = false;
      this.children = {};
      this.wordArr = []; //many places with the same name
    }

    Trie.prototype.insert = function (word, root) {
      let node = root;

      word
        .toLowerCase()
        .split("")
        .forEach((ch) => {
          if (!node.children[ch]) node.children[ch] = new Trie();
          node = node.children[ch];
        });

      node.completeString = true;
      node.wordArr.push(word);
    };

    Trie.prototype.search = function (word, root) {
      let node = root;

      const arr = word.toLowerCase().split("");
      let result = [];
      let tmp = [];

      for (const ch of arr) {
        if (!node.children[ch]) break;
        retrieveString(node.children[ch].children || {});
        if (tmp.length) result = tmp;
        tmp = [];
        node = node.children[ch];
      }

      return result;

      function retrieveString(children) {
        for (const key in children) {
          const obj = children[key];
          if (obj.completeString) tmp.push(...obj.wordArr);
          retrieveString(obj.children);
        }
      }
    };

    data.forEach((el) => this._regions.set(el.cityName, el));

    this._trieRoot = new Trie();

    [...this._regions.keys()].forEach((city) =>
      this._trieRoot.insert(city, this._trieRoot)
    );
  }

  renderAutoSuggestion(data) {
    this._buildTrie(data);
    this._modalInput.addEventListener("input", (e) => {
      const val = e.target.value;
      let html = "";
      this._modalContainer.innerHTML = "";
      if (val.length) {
        this._searchResults = this._trieRoot.search(val, this._trieRoot);

        html = `
          
            <div class="suggestion__category">Search results</div>
            ${this._searchResults
              .map(
                (loc) => `
              <div class="suggestion__item">
                <ion-icon class="icon" name="location-outline"></ion-icon>
                <div class="wrapper-suggestion">
                  <p class="suggestion__item--title">${modifyString(
                    loc,
                    val
                  )}</p>
                  <p class="suggestion__item--sub">${this._regions
                    .get(loc.toLowerCase())
                    .regionNames.fullName.split(",")
                    .at(-2)
                    .trim()}, Japan </p>
                </div>
              </div>
            `
              )
              .join("")}            
         
        `;
        this._modalContainer.style.marginBottom = "2rem";
      } else if (!this._modalContainer.closest(".search-bar-top")) {
        html = `
          
            <div class="suggestion__category">Recommended</div>
            <div class="suggestion__item">
              <ion-icon class="icon" name="location-outline"></ion-icon>
              <div class="wrapper-suggestion">
                <p class="suggestion__item--title suggestion__item--strong">Tokyo</p>
                <p class="suggestion__item--sub">Tokyo prefecture, Japan </p>
              </div>
            </div>
            <div class="suggestion__item">
              <ion-icon class="icon" name="location-outline"></ion-icon>
              <div class="wrapper-suggestion">
                <p class="suggestion__item--title suggestion__item--strong">Kyoto</p>
                <p class="suggestion__item--sub">Kyoto prefecture, Japan </p>
              </div>
            </div>
            <div class="suggestion__item">
              <ion-icon class="icon" name="location-outline"></ion-icon>
              <div class="wrapper-suggestion">
                <p class="suggestion__item--title suggestion__item--strong">Osaka</p>
                <p class="suggestion__item--sub">Osaka prefecture, Japan</p>
              </div>
            </div>
         
        `;
      } else this._modalContainer.style.marginBottom = 0;
      this._modalContainer.insertAdjacentHTML("afterbegin", html);
    });

    function modifyString(loc, val) {
      const arr = loc.split("");
      const valLen = val.length;
      const locLen = loc.length;

      for (let i = 0; i < valLen; i++) {
        if (i === locLen) break;

        if (arr[i].toLowerCase() === val[i].toLowerCase())
          arr[i] = `<span class="suggestion__item--strong">${arr[i]}</span>`;
      }

      return arr.join("");
    }
  }
}

export default new SearchBar();
