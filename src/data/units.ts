// Available units. To add a car: put photos in public/units/<id>/ and add an entry here.
// Reserved cars stay listed with `reserved: true` (shown with a red RESERVED label).
export type Unit = {
  id: string;
  name: string;
  year: number;
  type: "Sedan" | "SUV" | "MPV";
  price: number;
  downpayment: number;
  terms: { years: number; monthly: number }[];
  mileageKm: number;
  transmission: "Automatic" | "Manual";
  engine: string;
  engineLiters: number;
  fuel: "Gasoline" | "Diesel";
  highlights: string[];
  photos: string[];
  reserved?: boolean;
};

const photos = (id: string, count = 5) =>
  Array.from({ length: count }, (_, i) => `/units/${id}/${i + 1}.jpg`);

export const units: Unit[] = [
  {
    id: "honda-city-vx-2017",
    name: "Honda City VX Navi AT",
    year: 2017,
    type: "Sedan",
    price: 518000,
    downpayment: 68000,
    terms: [
      { years: 3, monthly: 19274 },
      { years: 4, monthly: 16291 },
    ],
    mileageKm: 50000,
    transmission: "Automatic",
    engine: "1.5L Gasoline",
    engineLiters: 1.5,
    fuel: "Gasoline",
    highlights: [
      "Top of the line",
      "Paddle shift",
      "Push start button",
      "Eco mode",
      "Dashcam front & back",
      "Super cold AC",
      "92% tires",
      "Papers updated to Oct 2027",
    ],
    photos: photos("honda-city-vx-2017"),
  },
  {
    id: "toyota-vios-mt-2021",
    name: "Toyota Vios 1.2 MT",
    year: 2021,
    type: "Sedan",
    price: 448000,
    downpayment: 68000,
    terms: [
      { years: 3, monthly: 15970.34 },
      { years: 4, monthly: 13350.03 },
    ],
    mileageKm: 68000,
    transmission: "Manual",
    engine: "1.2L Gasoline",
    engineLiters: 1.2,
    fuel: "Gasoline",
    highlights: ["1st owner", "Leather seat ready", "Mechanic inspected", "LTO verified", "Bacolod plate"],
    photos: photos("toyota-vios-mt-2021"),
  },
  {
    id: "honda-hrv-2017",
    name: "Honda HR-V 1.8 CVT",
    year: 2017,
    type: "SUV",
    price: 618000,
    downpayment: 78000,
    terms: [
      { years: 3, monthly: 23128.05 },
      { years: 4, monthly: 19548.9 },
    ],
    mileageKm: 50000,
    transmission: "Automatic",
    engine: "1.8L Gasoline",
    engineLiters: 1.8,
    fuel: "Gasoline",
    highlights: [
      "1st owner",
      "Push start button",
      "Paddle shift",
      "Premium leather seats",
      "Cruise control",
      "Eco mode",
      "90% thick tires",
    ],
    photos: photos("honda-hrv-2017"),
  },
  {
    id: "toyota-vios-2021",
    name: "Toyota Vios 1.2 AT",
    year: 2021,
    type: "Sedan",
    price: 498000,
    downpayment: 58000,
    terms: [
      { years: 3, monthly: 18491.98 },
      { years: 4, monthly: 15457.93 },
    ],
    mileageKm: 77000,
    transmission: "Automatic",
    engine: "1.2L Gasoline",
    engineLiters: 1.2,
    fuel: "Gasoline",
    highlights: ["1st owner", "New set of tires", "Bacolod plate"],
    photos: photos("toyota-vios-2021"),
    reserved: true,
  },
];
