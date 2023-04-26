// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"views/hotelView/hotelView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _view = _interopRequireDefault(require("../view.js"));
var _config = require("../../config.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HotelView = /*#__PURE__*/function (_View) {
  _inherits(HotelView, _View);
  var _super = _createSuper(HotelView);
  function HotelView() {
    var _this;
    _classCallCheck(this, HotelView);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "_navBar", document.querySelector(".nav-bar-1"));
    _defineProperty(_assertThisInitialized(_this), "_hotelDisplay", document.querySelector(".hotel-display"));
    _this.searchRegion = new URLSearchParams(window.location.search).get("region") || _config.DEFAULT_REGION;
    return _this;
  }
  _createClass(HotelView, [{
    key: "getStyle",
    value: function getStyle(domNode) {
      var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "display";
      return window.getComputedStyle(domNode).getPropertyValue(property);
    }
  }]);
  return HotelView;
}(_view.default);
exports.default = HotelView;
},{"../view.js":"views/view.js","../../config.js":"config.js"}],"views/hotelView/hotelNavView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hotelView = _interopRequireDefault(require("./hotelView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HotelNavView = /*#__PURE__*/function (_HotelView) {
  _inherits(HotelNavView, _HotelView);
  var _super = _createSuper(HotelNavView);
  function HotelNavView() {
    var _this;
    _classCallCheck(this, HotelNavView);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "_accordionControllTabs", document.querySelector(".hotel-display__controller").querySelectorAll(".accordion-df"));
    _defineProperty(_assertThisInitialized(_this), "_sliderContainers", document.querySelectorAll(".slider__container"));
    _defineProperty(_assertThisInitialized(_this), "_dropdownControllers", document.querySelectorAll(".dropdown__hotel-controller"));
    _defineProperty(_assertThisInitialized(_this), "_minGapPrice", 100);
    _defineProperty(_assertThisInitialized(_this), "_minGapDistance", 1);
    _defineProperty(_assertThisInitialized(_this), "_languageSlider", document.getElementById("language_supported"));
    _defineProperty(_assertThisInitialized(_this), "_languages", _toConsumableArray(_this._languageSlider.querySelectorAll(".checkbox__container")));
    _this._displayAccordionSubMenu();
    _this._setRangeSliderDefault();
    _this._updateDropdown();
    _this._shortenDropdown();
    return _this;
  }
  _createClass(HotelNavView, [{
    key: "_displayAccordionSubMenu",
    value: function _displayAccordionSubMenu() {
      var _this2 = this;
      this._accordionControllTabs.forEach(function (tab) {
        var _tab$querySelector;
        (_tab$querySelector = tab.querySelector(".dropdown")) === null || _tab$querySelector === void 0 ? void 0 : _tab$querySelector.addEventListener("click", function (e) {
          var link = e.target.closest(".dropdown");
          var content = link.querySelector(".dropdown--content");
          var icon = link.querySelector(".icon-dropdown");
          if (_this2.getStyle(content, "display") === "none") {
            _this2._accordionControllTabs.forEach(function (tab) {
              var tmp = tab.querySelector(".dropdown--content");
              if (!tmp) return;
              tmp.style.display = "none";
            });
            content.style.display = "block";
            icon.style.transform = "rotate(180deg)";
            _this2._curAccordionTab = content;
          } else {
            content.style.display = "none";
            icon.style.transform = "none";
          }
        });
      });
    }
  }, {
    key: "_setRangeSliderDefault",
    value: function _setRangeSliderDefault() {
      var _this3 = this;
      this._sliderContainers.forEach(function (ctn) {
        var slider1 = ctn.querySelector(".slider-1");
        var slider2 = ctn.querySelector(".slider-2");
        var max = slider1.max;
        var sliderGap = ctn.dataset.id === "price" ? +_this3._minGapPrice : +_this3._minGapDistance;
        var values = _toConsumableArray(ctn.closest(".range-slider").querySelectorAll(".slider__value--amt"));
        if (slider2) {
          _this3._setMultipleSliderDefault(slider1, slider2, sliderGap, max, values, ctn);
        } else {
          _this3._setSingleSliderDefault(slider1, max, values, ctn);
        }
      });
    }
  }, {
    key: "_setMultipleSliderDefault",
    value: function _setMultipleSliderDefault(slider1, slider2, sliderGap, max, values, ctn) {
      var _this4 = this;
      fillColor();
      slider1.addEventListener("input", function (e) {
        if (parseInt(slider2.value) - parseInt(e.target.value) <= sliderGap) {
          e.target.value = +slider2.value - sliderGap;
        }
        _this4._updateSliderTextContent(values[0], e.target.value);
        fillColor();
      });
      slider2.addEventListener("input", function (e) {
        if (parseInt(e.target.value) - parseInt(slider1.value) <= sliderGap) {
          e.target.value = +slider1.value + sliderGap;
        }
        _this4._updateSliderTextContent(values[1], e.target.value);
        fillColor();
      });
      function fillColor() {
        var percent1 = slider1.value / max * 100;
        var percent2 = slider2.value / max * 100;
        ctn.querySelector(".slider__track").style.background = "linear-gradient(to right, rgb(172, 172, 172) 0% ".concat(percent1, "%, rgb(21, 26, 27) ").concat(percent1, "% ").concat(percent2, "%, rgb(172, 172, 172) ").concat(percent2, "% 100%)");
      }
    }
  }, {
    key: "_setSingleSliderDefault",
    value: function _setSingleSliderDefault(slider1, max, values, ctn) {
      var _this5 = this;
      fillColor();
      slider1.addEventListener("input", function (e) {
        _this5._updateSliderTextContent(values[0], e.target.value);
        fillColor();
      });
      function fillColor() {
        var percent1 = slider1.value / max * 100;
        ctn.querySelector(".slider__track").style.background = "linear-gradient(to right, rgb(21, 26, 27) 0% ".concat(percent1, "%, rgb(172, 172, 172) ").concat(percent1, "% 100%)");
      }
    }
  }, {
    key: "_updateSliderTextContent",
    value: function _updateSliderTextContent(el, val) {
      el.textContent = val;
    }
  }, {
    key: "_updateDropdown",
    value: function _updateDropdown() {
      this._dropdownControllers.forEach(function (con) {
        return con.addEventListener("click", function (e) {
          var link = e.target.closest(".dropdown--options");
          if (!link) return;
          link.closest(".dropdown").querySelector("span").textContent = link.textContent;
        });
      });
    }
  }, {
    key: "_shortenDropdown",
    value: function _shortenDropdown() {
      var _this6 = this;
      this._languages.slice(4).forEach(function (el) {
        return el.style.display = "none";
      });
      this._languageSlider.insertAdjacentHTML("beforeend", "<button class='btn' data-state='close'>Show more</button>");
      this._languageSlider.querySelector(".btn").addEventListener("click", function (e) {
        var btn = e.target.closest(".btn");
        if (!btn) return;
        if (btn.textContent === "Show more") {
          _this6._languages.slice(4).forEach(function (el) {
            return el.style.display = "block";
          });
          btn.textContent = "Show less";
        } else {
          _this6._languages.slice(4).forEach(function (el) {
            return el.style.display = "none";
          });
          btn.textContent = "Show more";
        }
      });
    }
  }]);
  return HotelNavView;
}(_hotelView.default);
var _default = new HotelNavView();
exports.default = _default;
},{"./hotelView":"views/hotelView/hotelView.js"}],"views/hotelView/hotelOtherView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hotelView = _interopRequireDefault(require("./hotelView"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HotelOtherView = /*#__PURE__*/function (_HotelView) {
  _inherits(HotelOtherView, _HotelView);
  var _super = _createSuper(HotelOtherView);
  function HotelOtherView() {
    var _this;
    _classCallCheck(this, HotelOtherView);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "_hotelForm", document.querySelector(".hotel-form__container"));
    _defineProperty(_assertThisInitialized(_this), "_headerLocation", document.querySelector(".heading-secondary").querySelector("p"));
    _defineProperty(_assertThisInitialized(_this), "_btnLocation", document.querySelector(".nav-bar-1__bottom").querySelector(".btn__text"));
    _defineProperty(_assertThisInitialized(_this), "_btnCateLocation", document.querySelector(".nav-bar-1__bottom").querySelector(".dropdown--content").querySelectorAll(".dropdown--options__location"));
    _this._updateTextLocation();
    return _this;
  }
  _createClass(HotelOtherView, [{
    key: "_updateTextLocation",
    value: function _updateTextLocation() {
      var _this2 = this;
      this._headerLocation.textContent = this.searchRegion;
      this._btnLocation.textContent = this.searchRegion;
      this._btnCateLocation.forEach(function (btn) {
        return btn.textContent = _this2.searchRegion;
      });
    }
  }]);
  return HotelOtherView;
}(_hotelView.default);
var _default = new HotelOtherView();
exports.default = _default;
},{"./hotelView":"views/hotelView/hotelView.js"}],"views/hotelView/hotelResultView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hotelView = _interopRequireDefault(require("./hotelView"));
var _helpers = require("../../helpers");
var _config = require("../../config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HotelResultView = /*#__PURE__*/function (_HotelView) {
  _inherits(HotelResultView, _HotelView);
  var _super = _createSuper(HotelResultView);
  function HotelResultView() {
    var _this;
    _classCallCheck(this, HotelResultView);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "_imageSlidesContainer", void 0);
    _defineProperty(_assertThisInitialized(_this), "_dropdownContent", document.querySelector(".sort-results").querySelector(".dropdown--content"));
    _defineProperty(_assertThisInitialized(_this), "_dropdownBtn", _this._hotelDisplay.querySelector(".btn--dropdown"));
    _defineProperty(_assertThisInitialized(_this), "_formContainer", document.querySelector(".form__container"));
    _defineProperty(_assertThisInitialized(_this), "_resultsContainer", document.querySelector(".hotel-display__results--container"));
    _defineProperty(_assertThisInitialized(_this), "_resultsCount", document.querySelector(".results-count"));
    _defineProperty(_assertThisInitialized(_this), "_sort", "Hotel class");
    _defineProperty(_assertThisInitialized(_this), "_distanceSlider", document.getElementById("distance_from"));
    _defineProperty(_assertThisInitialized(_this), "_languagesCheckbox", document.getElementById("language_supported").querySelectorAll(".checkbox__container"));
    _defineProperty(_assertThisInitialized(_this), "_starsCheckbox", document.getElementById("stars").querySelectorAll(".checkbox__container"));
    _defineProperty(_assertThisInitialized(_this), "_offersCheckbox", document.getElementById("offers").querySelectorAll(".checkbox__container"));
    _defineProperty(_assertThisInitialized(_this), "_query", {
      region: _this.searchRegion,
      sort: _this._sort
    });
    _defineProperty(_assertThisInitialized(_this), "_page", 1);
    _defineProperty(_assertThisInitialized(_this), "_paginationContainer", document.querySelector(".hotel-display__pagination"));
    _defineProperty(_assertThisInitialized(_this), "_paginationForm", _this._paginationContainer.querySelector(".pagination__form"));
    _defineProperty(_assertThisInitialized(_this), "_pagBtnPrev", _this._paginationContainer.querySelector(".btn-prev"));
    _defineProperty(_assertThisInitialized(_this), "_pagBtnNext", _this._paginationContainer.querySelector(".btn-next"));
    _defineProperty(_assertThisInitialized(_this), "_pagTotal", _this._paginationContainer.querySelector(".pagination__total"));
    _defineProperty(_assertThisInitialized(_this), "_pagInput", _this._paginationContainer.querySelector(".form__input"));
    _this._updateDropdown();
    _this._openDropdown();
    _this._updateSlider();
    _this._updateCheckBox();
    _this._updatePagination();
    return _this;
  }
  _createClass(HotelResultView, [{
    key: "addHandlerRenderProperties",
    value: function () {
      var _addHandlerRenderProperties = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(handler) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this._handler = handler;
              handler.call(this, this._query);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function addHandlerRenderProperties(_x) {
        return _addHandlerRenderProperties.apply(this, arguments);
      }
      return addHandlerRenderProperties;
    }()
  }, {
    key: "_callHandler",
    value: function _callHandler() {
      document.querySelector(".nav-bar-1").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      this._resultsContainer.innerHTML = "";
      this._renderSkeleton();
      this._data = null;
      this._handler.call(this, this._query);
    }
  }, {
    key: "_setImageSliderDefault",
    value: function _setImageSliderDefault() {
      document.querySelectorAll(".img__container").forEach(function (ctn) {
        var slides = ctn.querySelectorAll(".hotel-display__img");
        var maxSlide = slides.length;
        var curSlide = 0;
        goToSlide(0);
        var btnLeft = ctn.querySelector(".btn-left");
        var btnRight = ctn.querySelector(".btn-right");
        btnLeft.addEventListener("click", function (_) {
          prevSlide(curSlide);
        });
        btnRight.addEventListener("click", function (_) {
          nextSlide(curSlide);
        });
        function goToSlide(slide) {
          slides.forEach(function (s, i) {
            return s.style.transform = "translateX(".concat(100 * (i - slide), "%)");
          });
        }
        function nextSlide(cur) {
          if (cur === maxSlide - 1) {
            curSlide = 0;
          } else {
            curSlide++;
          }
          goToSlide(curSlide);
        }
        function prevSlide(cur) {
          if (cur === 0) {
            curSlide = maxSlide - 1;
          } else {
            curSlide--;
          }
          goToSlide(curSlide);
        }
      });
    }
  }, {
    key: "_updateSlider",
    value: function _updateSlider() {
      var _this2 = this;
      this._distanceSlider.querySelector("input").addEventListener("change", /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _this2._query["maxDist"] = e.target.value;
                _this2._callHandler.call(_this2);
              case 2:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_updatePagination",
    value: function _updatePagination() {
      var _this3 = this;
      this._paginationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!_this3._data) return;
        var val = e.target.querySelector(".form__input").value;
        getPage.call(_this3, +val);
      });
      this._pagBtnPrev.addEventListener("click", function (e) {
        if (!_this3._data) return;
        if (_this3._page === 1) return;
        getPage.call(_this3, _this3._page - 1);
      });
      this._pagBtnNext.addEventListener("click", function (e) {
        if (!_this3._data) return;
        if (_this3._page === _this3._maxPage) return;
        getPage.call(_this3, _this3._page + 1);
      });
      function getPage(page) {
        var checkedVal = isNaN(page) || page < 1 || page > this._maxPage ? 1 : page;
        checkedVal > 1 ? this._pagBtnPrev.classList.add("btn-active") : this._pagBtnPrev.classList.remove("btn-active");
        checkedVal === this._maxPage ? this._pagBtnNext.classList.remove("btn-active") : this._pagBtnNext.classList.add("btn-active");
        this._page = checkedVal;
        this._query["page"] = this._page;
        this._callHandler.call(this);
      }
    }
  }, {
    key: "_updateCheckBox",
    value: function _updateCheckBox() {
      var _this4 = this;
      this._languagesCheckbox.forEach(function (el) {
        return el.addEventListener("change", function (e) {
          return update.call(_this4, e);
        });
      });
      this._starsCheckbox.forEach(function (el) {
        return el.addEventListener("change", function (e) {
          return update.call(_this4, e);
        });
      });
      this._offersCheckbox.forEach(function (el) {
        return el.addEventListener("change", function (e) {
          return update.call(_this4, e);
        });
      });
      function update(e) {
        if (!this._data) return; //ignore change when data hasn't arrived
        var boxChecked = e.target.closest(".wrapper").nextElementSibling.textContent;
        var key = e.target.closest(".accordion-df__panel--item").getAttribute("id");
        updateQuery.call(this, key, boxChecked, e.target.checked);
        this._callHandler.call(this);
      }
      function updateQuery(key, boxChecked, checked) {
        var queryHelper = function queryHelper(field) {
          var val = field === "star" ? boxChecked.at(0) : boxChecked;
          if (!checked) {
            var arr = this._query[field].split(",");
            arr.splice(arr.indexOf(val), 1);
            if (arr.length === 0) return delete this._query[field];
            this._query[field] = arr.toString();
            return;
          }
          this._query[field] ? this._query[field] += "," + val : this._query[field] = val;
        };
        switch (key) {
          case "stars":
            queryHelper.call(this, "star");
            break;
          case "language_supported":
            queryHelper.call(this, "languages");
            break;
          case "offers":
            queryHelper.call(this, "offers");
            break;
        }
      }
    }
  }, {
    key: "_openDropdown",
    value: function _openDropdown() {
      var _this5 = this;
      this._dropdownBtn.addEventListener("click", function (e) {
        var parent = e.target.closest(".dropdown");
        var content = parent.querySelector(".dropdown--content");
        var icon = parent.querySelector(".icon-dropdown");
        if (_this5.getStyle(content, "display") === "none") {
          content.style.display = "block";
          icon.style.transform = "rotate(180deg)";
        } else {
          content.style.display = "none";
          icon.style.transform = "none";
        }
      });
    }
  }, {
    key: "_updateDropdown",
    value: function _updateDropdown() {
      var _this6 = this;
      this._dropdownContent.addEventListener("click", function (e) {
        if (!_this6._data) return; //ignore change when data hasn't arrived

        var link = e.target.closest(".dropdown--options");
        var parent = link.closest(".dropdown");
        var content = parent.querySelector(".dropdown--content");
        var icon = parent.querySelector(".icon-dropdown");
        if (_this6.getStyle(content, "display") === "none") {
          content.style.display = "block";
          icon.style.transform = "rotate(180deg)";
        } else {
          content.style.display = "none";
          icon.style.transform = "none";
        }
        parent.querySelector("span").textContent = link.textContent;
        if (_this6._sort === link.textContent) return;
        _this6.renderPropertyCard(_this6._sortResults(link.textContent));
      });
    }
  }, {
    key: "_sortResults",
    value: function _sortResults(sortType) {
      this._sort = sortType;
      this._query["sort"] = this._sort;
      switch (sortType) {
        case "Distance":
          return this._data.sort(function (a, b) {
            return +a.distance - +b.distance;
          });
        case "Hotel class":
          return this._data.sort(function (a, b) {
            return b.star - a.star;
          });
        case "Review":
          return this._data.sort(function (a, b) {
            return b.summaries.totalCount - a.summaries.totalCount;
          });
      }
    }
  }, {
    key: "renderDefaultPropertyCard",
    value: function renderDefaultPropertyCard() {
      return (0, _helpers.goToPage)("hotels?region=Tokyo");
    }
  }, {
    key: "renderResultPreview",
    value: function renderResultPreview(totalCount) {
      if (!totalCount) return this._resultsContainer.insertAdjacentHTML("afterbegin", "<p>No results found 😢</p>");
      this._resultsCount.querySelector(".results-count__number").textContent = "".concat(totalCount, " hotel").concat(totalCount > 1 ? "s" : "", " ");
      this._resultsCount.querySelector(".results-count__number").nextElementSibling.textContent = "in";
      this._resultsCount.querySelector(".results-count__location").textContent = this.searchRegion;
    }
  }, {
    key: "renderUpdatePagination",
    value: function renderUpdatePagination(totalCount) {
      this._maxPage = Math.ceil(totalCount / _config.DEFAULT_PROPERTIES_LIMIT);
      this._pagTotal.textContent = this._maxPage;
      this._pagInput.placeholder = this._page;
      this._pagInput.value = "";
      this._pagInput.blur();
    }
  }, {
    key: "_renderSkeleton",
    value: function _renderSkeleton() {
      this._resultsCount.querySelector(".results-count__number").textContent = "Looking for hotels ";
      var html = "";
      for (var i = 0; i < _config.DEFAULT_PROPERTY_SKELETON; i++) {
        html += "<div class=\"hotel-display__results\">\n          <div class=\"img__container skeleton skeleton__img\"></div>\n          <div class=\"listing__title\">\n            <div class=\"skeleton skeleton--text skeleton__text--big\"></div>\n          </div>\n          <div class=\"listing__info\">\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n          </div>\n          <div class=\"listing-price\">\n            <div class=\"skeleton skeleton--text\"></div>\n            <div class=\"skeleton skeleton--text\"></div>\n          </div>\n        </div>";
      }
      this._resultsContainer.insertAdjacentHTML("afterbegin", html);
    }
  }, {
    key: "renderPropertyCard",
    value: function renderPropertyCard(data) {
      var _this$_data,
        _this7 = this;
      this._data = data;
      this._resultsContainer.innerHTML = "";
      (_this$_data = this._data) === null || _this$_data === void 0 ? void 0 : _this$_data.forEach(function (el, idx) {
        var html = "\n      <div class=\"hotel-display__results\">\n        <div class=\"img__container\">\n          ".concat(_this7._getImagesHTML(el.details.propertyGallery), "\n          <button class=\"btn btn-left\">\n            <ion-icon class=\"icon\" name=\"chevron-back-outline\"></ion-icon>\n          </button>\n          <button class=\"btn btn-right\">\n            <ion-icon class=\"icon\" name=\"chevron-forward-outline\"></ion-icon>\n          </button>\n        </div>\n        <div class=\"listing__title\">\n          <span>").concat((_this7._page - 1) * 30 + (idx + 1), ". ").concat(el.name, "</span>\n          <div class=\"hotel-star\"> \n            <span class=\"star-container\">\n              ").concat(_this7._getStarsHTML(el.star), "\n            </span>\n          </div>\n        </div>\n        <div class=\"listing__info\"> \n          <div class=\"circle-rating--container\">\n            ").concat(_this7._getReviewHTML(el.reviews.reviews, el.summaries), "\n          </div>\n          <p class=\"hotel-preview\">\n            ").concat(el.details.summary.location.whatsAround.split(".").slice(0, 2).join("."), ".\n          </p>\n\n          <div class=\"offer-summary\">\n            <ion-icon class=\"icon\" name=\"card-outline\"></ion-icon>\n            <p class=\"offer-message\">").concat(el.offerSummary[0].message, "</p>\n          </div>\n          \n          \n        </div>\n        <div class=\"listing-price\"> \n          \n          <button class=\"btn btn__add-to-cart\">\n            <a class=\"link-redirect\" href=\"#\">Show prices</a>\n          </button>\n          <p class=\"payment__info\"> \n            Enter dates to see prices\n          </p>\n        </div>\n      </div>\n      ");
        _this7._resultsContainer.insertAdjacentHTML("beforeend", html);
      });
      this._setImageSliderDefault();
    }
  }, {
    key: "_getImagesHTML",
    value: function _getImagesHTML(gallery) {
      return gallery.slice(0, 10).map(function (el) {
        return "<img class=\"hotel-display__img\" src=\"".concat(el.url, "\" alt=\"").concat(el.alt, "\"/>");
      });
    }
  }, {
    key: "_getStarsHTML",
    value: function _getStarsHTML(stars) {
      return Array(Math.floor(+stars)).fill("<ion-icon class=\"icon\" name=\"star\"></ion-icon>").join("");
    }
  }, {
    key: "_getReviewHTML",
    value: function _getReviewHTML(reviews, summaries) {
      if (!reviews.length) return "";
      var review = getMostRecentReview(reviews);
      var circles = Array(convertReviewBase5(review.reviewScoreWithDescription.split(" ")[0].split("/")[0])).fill('<div class="circle-rating circle-rating--full"></div>').join("");
      var comments = "<p class=\"review-comment\">".concat(review.reviewScoreWithDescription, " <span>(").concat(summaries.totalCount, " reviews)</span></p>");
      return circles + comments;
      function getMostRecentReview(reviews) {
        var review = reviews.sort(function (a, b) {
          return new Date(b.submissionTimeLocalized).getTime() - new Date(a.submissionTimeLocalized).getTime();
        })[0];
        return review;
      }
      function convertReviewBase5(reviewScore) {
        return Math.floor(reviewScore * 0.5);
      }
    }
  }]);
  return HotelResultView;
}(_hotelView.default);
var _default = new HotelResultView();
exports.default = _default;
},{"./hotelView":"views/hotelView/hotelView.js","../../helpers":"helpers.js","../../config":"config.js"}],"controllers/hotelsController.js":[function(require,module,exports) {
"use strict";

var model = _interopRequireWildcard(require("../model.js"));
var _hotelNavView = _interopRequireDefault(require("../views/hotelView/hotelNavView.js"));
var _hotelOtherView = _interopRequireDefault(require("../views/hotelView/hotelOtherView.js"));
var _hotelResultView = _interopRequireDefault(require("../views/hotelView/hotelResultView.js"));
var _helpers = require("../helpers.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var controlPropertyItems = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(searchQuery) {
    var data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return model.getProperties(searchQuery);
        case 2:
          data = _context.sent;
          if (data) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", _hotelResultView.default.renderDefaultPropertyCard());
        case 5:
          _hotelResultView.default.renderResultPreview(data.total);
          _hotelResultView.default.renderPropertyCard(data.data);
          _hotelResultView.default.renderUpdatePagination(data.total);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function controlPropertyItems(_x) {
    return _ref.apply(this, arguments);
  };
}();
(0, _helpers.catchAsync)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return _hotelResultView.default.addHandlerRenderProperties(controlPropertyItems);
      case 2:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})))();
},{"../model.js":"model.js","../views/hotelView/hotelNavView.js":"views/hotelView/hotelNavView.js","../views/hotelView/hotelOtherView.js":"views/hotelView/hotelOtherView.js","../views/hotelView/hotelResultView.js":"views/hotelView/hotelResultView.js","../helpers.js":"helpers.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50371" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/hotelsController.e9a0b2ac.js.map