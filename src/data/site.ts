// Business details — taken from the Facebook page
export const site = {
  name: "Negros Preowned - Car Trading",
  tagline: "Quality cars. Honest deals. Smooth transactions.",
  address: "Zone 1, Antilla Subd., Silay City, Negros Occidental",
  contactName: "Mark",
  phone: "+639983062389",
  phoneDisplay: "0998 306 2389",
  // Page's Messenger chat — m.me opens the Messenger app on phones
  messenger: "https://m.me/101285389306630",
  facebook: "https://www.facebook.com/negrospreownedcartrading",
  financingPartner: "Global Dominion Financing Inc.",
};

// Opens the phone's messaging app with Mark's number and a ready-made message.
// "?&body=" works on both iPhone and Android.
export const smsLink = (body = "Hi Mark! I saw your website and I'm interested in one of your units.") =>
  `sms:${site.phone}?&body=${encodeURIComponent(body)}`;

export const stats = [
  { value: 100, suffix: "%", label: "Recommend us" },
  { value: 34, suffix: "", label: "Facebook reviews" },
  { value: 5.7, suffix: "K", label: "Followers", decimals: 1 },
  { value: 8, suffix: "", label: "Cars sold in August" },
];

export const perks = [
  {
    title: "Mechanic Inspected",
    text: "Every unit is checked and maintained before it goes on sale. Bring your own mechanic too.",
  },
  {
    title: "LTO Verified Papers",
    text: "Clean, verified documents. Free transfer of ownership on every unit.",
  },
  {
    title: "Easy Financing",
    text: "Low downpayment options with Global Dominion — Top Performer Dealer, Q1.",
  },
  {
    title: "Hand-Over Ready",
    text: "Every unit is cleaned, detailed and serviced before we hand you the keys.",
  },
];
