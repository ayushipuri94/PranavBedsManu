// ─────────────────────────────────────────────────────────────
//  WEDDING DETAILS: edit names, dates, venue and copy here.
//  Every page reads from this file; nothing is typed into the HTML.
// ─────────────────────────────────────────────────────────────

export const COUPLE = {
  short: "Pranav & Manu",
  groom: { name: "Pranav Bhagwanani", parents: "S/o Lucy Pooja & Group Capt Anil Bhagwanani" },
  bride: { name: "Manu Latesh Agrawal", parents: "D/o Swati & Latesh Agrawal" },
};

export const DATES = {
  range: "22 – 24 January 2027",
  // countdown target (welcome dinner), with timezone offset
  departure: "2027-01-22T20:00:00+05:30",
};

export const VENUE = {
  name: "Suraburdi Meadows",
  city: "Nagpur",
  address: "Nagpur–Amravati Highway, Nagpur",
  mapsQuery: "Suraburdi Meadows Nagpur",
};

export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.mapsQuery)}`;

// Copy for the scrolling invitation (index.html), top to bottom.
export const INVITE = {
  welcome: {
    tag: "Flight PM 2201 \u00a0·\u00a0 Now Boarding",
    title: "Welcome aboard",
    lead: "You are invited to the wedding of",
    hint: "Scroll to take off",
  },
  captain: {
    blessing: "॥ श्री गणेशाय नमः ॥",
    tag: "A note from the captain",
    lead: "With the blessings of our families, we request the pleasure of your company at the wedding of",
    joiner: "with",
  },
  destination: { tag: "Destination", note: "All celebrations take place here", button: "Get directions" },
  countdown: {
    tag: "Departure in",
    units: ["Days", "Hrs", "Min", "Sec"],
    note: "Fasten your seatbelts, it's going to be a beautiful journey.",
  },
  final: { tag: "Landed safely", note: "…into forever. We can't wait to celebrate with you." },
};

// Top menu, shared by every page.
// title = browser-tab title for that page.
export const NAV = [
  { href: "index.html", label: "Invite", title: "Pranav & Manu · Welcome Aboard" },
  { href: "story.html", label: "Story", title: "Our Story · Pranav & Manu" },
  { href: "events.html", label: "Events", title: "Events · Pranav & Manu" },
  { href: "travel.html", label: "Travel", title: "Travel & Stay · Pranav & Manu" },
  { href: "rsvp.html", label: "RSVP", title: "RSVP · Pranav & Manu" },
];

// Link preview (WhatsApp, iMessage…) and search description. Written into the
// HTML <head> by `node tools/release.mjs`, because previews can't run JavaScript.
export const SHARE = {
  description: "Welcome aboard! You are invited to the wedding of Pranav & Manu · 22–24 January 2027 · Suraburdi Meadows, Nagpur",
  title: "Welcome aboard! Pranav & Manu are getting married",
  text: "22–24 January 2027 · Suraburdi Meadows, Nagpur. Tap to board.",
  image: "assets/scene/share-preview.webp",
};
