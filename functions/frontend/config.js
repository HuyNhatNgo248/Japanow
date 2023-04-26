export const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoibm5oeXUyNDgiLCJhIjoiY2xlYXdtbnhvMGxqcjN2cG5rdmY5cHd1ayJ9.4NE1Bp168JUT02pR7W1_Ww";

export const LIMIT_FORWARD_GEOCODE = 5;
export const LIMIT_POIS = 5;

export const DEFAULT_MAP_LOCATION = {
  name: "Tokyo",
  countryName: "Japan",
  country: "JP",
  lat: 35.71240642621037,
  lng: 139.81092069351652,
};

export const DEFAULT_SORT = "Hotel-class";
export const DEFAULT_REGION = "Tokyo";
export const DEFAULT_MIN_DIST = 0; //km
export const DEFAULT_MAX_DIST = 50; //km
export const DEFAULT_PROPERTIES_LIMIT = 30;

export const DEFAULT_PROPERTY_SKELETON = 7;

export const DEFAULT_ACTIVITIES = new Map([
  ["shrine", "⛩️"],
  ["castle", "🏯"],
  ["bullet train", "🚄"],
  ["ramen", "🍜"],
  ["onsen monkey", "🌊"],
  ["cherry blossom", "🌸"],
  ["snow", "❄️"],
]);

export const DEFAULT_CITIES = new Map([
  [
    "tokyo",
    "offers a seemingly unlimited choice of shopping, entertainment, culture and dining to its visitors. The city's history can be appreciated in districts such as Asakusa and in many excellent museums, historic temples and gardens...",
  ],

  [
    "osaka",
    "is also the city of comedy. With comedy styles such as manzai originating in Osaka and gaining popularity throughout the rest of the country, Osaka is known as the city with the friendliest and funniest people in Japan...",
  ],

  [
    "kyoto",
    "attracts millions of local and international visitors each year looking for traditional Japanese culture. Temples and shrines such as Kiyomizudera Temple and Kinkakuji draw lots off attention from visitors...",
  ],

  [
    "nagoya",
    "is a city of some 2000 temples and shrines: a city of true masterpieces of religious architecture, such as the retina-burning splendor of Kinkaku-ji and the cavernous expanse of Higashi Hongan-ji...",
  ],

  [
    "sapporo",
    ", capital of the mountainous northern Japanese island of Hokkaido, is famous for its beer, skiing and annual Sapporo Snow Festival featuring enormous ice sculptures...",
  ],

  [
    "yokohama",
    ", is the first harbor city introduced to the world as the entrance to Japan. Since the time its port was opened, Yokohama has been vigorously acquiring new cultures and information from foreign countries...",
  ],

  [
    "kobe",
    "is a city on Osaka Bay in central Japan. It is known for its signature marbled beef and scenic setting of mountains framing the harbor. The Ikuta Shrine, dating to the 3rd century, is among Japan's oldest Shinto shrines...",
  ],
]);
