import HotelView from "./hotelView";

class HotelNavView extends HotelView {
  _accordionControllTabs = document
    .querySelector(".hotel-display__controller")
    .querySelectorAll(".accordion-df");
  _sliderContainers = document.querySelectorAll(".slider__container");
  _dropdownControllers = document.querySelectorAll(
    ".dropdown__hotel-controller"
  );
  _minGapPrice = 100;
  _minGapDistance = 1;

  _languageSlider = document.getElementById("language_supported");
  _languages = [
    ...this._languageSlider.querySelectorAll(".checkbox__container"),
  ];

  constructor() {
    super();
    this._displayAccordionSubMenu();
    this._setRangeSliderDefault();
    this._updateDropdown();
    this._shortenDropdown();
  }

  _displayAccordionSubMenu() {
    this._accordionControllTabs.forEach((tab) => {
      tab.querySelector(".dropdown")?.addEventListener("click", (e) => {
        const link = e.target.closest(".dropdown");
        const content = link.querySelector(".dropdown--content");
        const icon = link.querySelector(".icon-dropdown");

        if (this.getStyle(content, "display") === "none") {
          this._accordionControllTabs.forEach((tab) => {
            const tmp = tab.querySelector(".dropdown--content");
            if (!tmp) return;
            tmp.style.display = "none";
          });

          content.style.display = "block";
          icon.style.transform = "rotate(180deg)";
          this._curAccordionTab = content;
        } else {
          content.style.display = "none";
          icon.style.transform = "none";
        }
      });
    });
  }

  _setRangeSliderDefault() {
    this._sliderContainers.forEach((ctn) => {
      const slider1 = ctn.querySelector(".slider-1");
      const slider2 = ctn.querySelector(".slider-2");
      const max = slider1.max;
      const sliderGap =
        ctn.dataset.id === "price" ? +this._minGapPrice : +this._minGapDistance;

      const values = [
        ...ctn.closest(".range-slider").querySelectorAll(".slider__value--amt"),
      ];

      if (slider2) {
        this._setMultipleSliderDefault(
          slider1,
          slider2,
          sliderGap,
          max,
          values,
          ctn
        );
      } else {
        this._setSingleSliderDefault(slider1, max, values, ctn);
      }
    });
  }

  _setMultipleSliderDefault(slider1, slider2, sliderGap, max, values, ctn) {
    fillColor();

    slider1.addEventListener("input", (e) => {
      if (parseInt(slider2.value) - parseInt(e.target.value) <= sliderGap) {
        e.target.value = +slider2.value - sliderGap;
      }

      this._updateSliderTextContent(values[0], e.target.value);
      fillColor();
    });

    slider2.addEventListener("input", (e) => {
      if (parseInt(e.target.value) - parseInt(slider1.value) <= sliderGap) {
        e.target.value = +slider1.value + sliderGap;
      }

      this._updateSliderTextContent(values[1], e.target.value);
      fillColor();
    });

    function fillColor() {
      const percent1 = (slider1.value / max) * 100;
      const percent2 = (slider2.value / max) * 100;
      ctn.querySelector(
        ".slider__track"
      ).style.background = `linear-gradient(to right, rgb(172, 172, 172) 0% ${percent1}%, rgb(21, 26, 27) ${percent1}% ${percent2}%, rgb(172, 172, 172) ${percent2}% 100%)`;
    }
  }

  _setSingleSliderDefault(slider1, max, values, ctn) {
    fillColor();

    slider1.addEventListener("input", (e) => {
      this._updateSliderTextContent(values[0], e.target.value);
      fillColor();
    });

    function fillColor() {
      const percent1 = (slider1.value / max) * 100;
      ctn.querySelector(
        ".slider__track"
      ).style.background = `linear-gradient(to right, rgb(21, 26, 27) 0% ${percent1}%, rgb(172, 172, 172) ${percent1}% 100%)`;
    }
  }

  _updateSliderTextContent(el, val) {
    el.textContent = val;
  }

  _updateDropdown() {
    this._dropdownControllers.forEach((con) =>
      con.addEventListener("click", (e) => {
        const link = e.target.closest(".dropdown--options");
        if (!link) return;
        link.closest(".dropdown").querySelector("span").textContent =
          link.textContent;
      })
    );
  }

  _shortenDropdown() {
    this._languages.slice(4).forEach((el) => (el.style.display = "none"));
    this._languageSlider.insertAdjacentHTML(
      "beforeend",
      "<button class='btn' data-state='close'>Show more</button>"
    );
    this._languageSlider
      .querySelector(".btn")
      .addEventListener("click", (e) => {
        const btn = e.target.closest(".btn");
        if (!btn) return;

        if (btn.textContent === "Show more") {
          this._languages
            .slice(4)
            .forEach((el) => (el.style.display = "block"));
          btn.textContent = "Show less";
        } else {
          this._languages.slice(4).forEach((el) => (el.style.display = "none"));
          btn.textContent = "Show more";
        }
      });
  }
}

export default new HotelNavView();
