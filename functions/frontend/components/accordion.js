class Accordion {
  _accordionTab = document.querySelectorAll(".accordion__tab--header");

  _accordionControllTabs = document.querySelectorAll(".accordion-df");

  constructor() {
    this.displayAccordion();
    this.displayAccordionDefault();
    this._initOpenAccordion();
  }

  displayAccordion() {
    this._accordionTab.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        let panel = e.target
          .closest(".accordion__tab")
          .querySelector(".accordion__tab--panel");

        if (tab.classList.contains("accordion__tab--active")) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }

        tab.classList.toggle("accordion__tab--active");
      });
    });
  }

  displayAccordionDefault() {
    this._accordionControllTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        let panel = e.target
          .closest(".accordion-df")
          .querySelector(".accordion-df__panel");

        if (
          tab.classList.contains("accordion-df__active") &&
          e.target.classList[0]?.includes("accordion-df__header")
        ) {
          panel.style.maxHeight = null;
          tab.classList.remove("accordion-df__active");
          panel.style.overflow = "hidden";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.overflow = "visible";
          tab.classList.add("accordion-df__active");
        }
      });
    });
  }

  _initOpenAccordion() {
    document
      .querySelector(".hotel-display")
      ?.querySelectorAll(".accordion-df")
      .forEach((tab) => {
        let panel = tab.querySelector(".accordion-df__panel");
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.overflow = "visible";
        tab.classList.add("accordion-df__active");
      });
  }
}

export default Accordion;
