// Released units — photos from the "Officially SOLD" posts. Add new ones to the top.
export type SoldUnit = {
  photo: string;
  car: string;
  location?: string;
  note?: string;
};

export const sold: SoldUnit[] = [
  { photo: "/sold/swift-iloilo.jpg", car: "Suzuki Swift", location: "Iloilo City", note: "Bought via online viewing" },
  { photo: "/sold/avanza-isabela.jpg", car: "Toyota Avanza", location: "Isabela" },
  { photo: "/sold/innova-talisay.jpg", car: "Toyota Innova", location: "Talisay City" },
  { photo: "/sold/avanza-ofw.jpg", car: "Toyota Avanza", location: "OFW client", note: "Bought without seeing the unit" },
  { photo: "/sold/city-silay.jpg", car: "Honda City", location: "Silay City" },
  { photo: "/sold/innova-bacolod.jpg", car: "Toyota Innova", location: "Bacolod City" },
  { photo: "/sold/city-vx-sagay.jpg", car: "Honda City VX", location: "Sagay City" },
  { photo: "/sold/vios-silay.jpg", car: "Toyota Vios 2018", location: "Silay City" },
  { photo: "/sold/xpander-innova.jpg", car: "Mitsubishi Xpander", note: "2 units sold in one day" },
  { photo: "/sold/spresso-sancarlos.jpg", car: "Suzuki S-Presso", location: "San Carlos City" },
  { photo: "/sold/wigo-sagay.jpg", car: "Toyota Wigo", location: "Sagay City" },
  { photo: "/sold/city-silay-2.jpg", car: "Honda City", location: "Silay City" },
  { photo: "/sold/innova-bacolod-2.jpg", car: "Toyota Innova", location: "Bacolod City" },
  { photo: "/sold/toboso.jpg", car: "Happy client", location: "Toboso" },
  { photo: "/sold/jimny.jpg", car: "Suzuki Jimny" },
  { photo: "/sold/ertiga.jpg", car: "Suzuki Ertiga" },
];
