// Available units. To add a car: put photos in public/units/<id>/ and add an entry here.
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
};

const photos = (id: string, count = 5) =>
  Array.from({ length: count }, (_, i) => `/units/${id}/${i + 1}.jpg`);

export const units: Unit[] = [
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
    id: "suzuki-ertiga-2020",
    name: "Suzuki Ertiga 1.5 Black Edition",
    year: 2020,
    type: "MPV",
    price: 658000,
    downpayment: 128000,
    terms: [
      { years: 3, monthly: 22416.2 },
      { years: 4, monthly: 19186.88 },
    ],
    mileageKm: 18000,
    transmission: "Automatic",
    engine: "1.5L Gasoline",
    engineLiters: 1.5,
    fuel: "Gasoline",
    highlights: [
      "1st owner",
      "Top of the line",
      "Push start button",
      '10" head unit',
      "Dual cold aircon",
      "98% thick tires",
    ],
    photos: photos("suzuki-ertiga-2020"),
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
  },
  {
    id: "toyota-innova-2013",
    name: "Toyota Innova 2.5 Diesel MT",
    year: 2013,
    type: "MPV",
    price: 478000,
    downpayment: 98000,
    terms: [
      { years: 2, monthly: 22634.07 },
      { years: 3, monthly: 16986.84 },
    ],
    mileageKm: 90000,
    transmission: "Manual",
    engine: "2.5L Turbo Diesel",
    engineLiters: 2.5,
    fuel: "Diesel",
    highlights: ["1st owner", "Leather seats", "Dual cold aircon", "98% thick tires", "Bacolod plate"],
    photos: photos("toyota-innova-2013"),
  },
];
