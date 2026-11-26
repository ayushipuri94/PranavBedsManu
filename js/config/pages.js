// ─────────────────────────────────────────────────────────────
//  CONTENT for the Story, Travel and RSVP pages.
//  Text in [brackets] is a placeholder still waiting for real details.
// ─────────────────────────────────────────────────────────────

export const STORY = {
  kicker: "The flight log",
  title: "Our Story",
  sub: "How Pranav & Manu found each other",
  // photo: put an image in assets/story/ and write its file name, e.g. "first-date.jpg"
  chapters: [
    { when: "Departure · [year]", title: "How we met", text: "[A few lines about where and how you first met.]", photo: "" },
    { when: "Cruising · [year]", title: "Falling for each other", text: "[A favourite memory, trip or inside joke.]", photo: "" },
    { when: "The question · [year]", title: "The proposal", text: "[Where and how the proposal happened.]", photo: "" },
    { when: "Landing · 24 January 2027", title: "Forever begins",
      text: "Pranav & Manu tie the knot at Suraburdi Meadows, Nagpur, with the people they love most around them." },
  ],
};

export const TRAVEL = {
  kicker: "Flight information",
  title: "Travel & Stay",
  sub: "Getting to Suraburdi Meadows, Nagpur",
  sections: [
    { kicker: "Destination", heading: "Suraburdi Meadows", big: true,
      text: "A lakeside resort on the Nagpur–Amravati highway, about 13 km from Nagpur city. All celebrations happen here.",
      button: "Open in Google Maps", maps: true },
    { kicker: "By air", heading: "Dr. Babasaheb Ambedkar International Airport (NAG)",
      text: "Nagpur's airport is in Sonegaon, about 8 km southwest of the city centre, with direct flights from most major Indian cities. From the airport, take a cab to the venue." },
    { kicker: "By train", heading: "Nagpur Junction (NGP)",
      text: "The city's main railway station, well connected across India. Cabs and autos are available outside the station." },
    { kicker: "Where to stay", heading: "Accommodation",
      text: "[Room block / hotel details: name, booking code, check-in dates.]",
      todo: "Send me the hotel or room-block details and I'll fill this in." },
    { kicker: "Need help?", heading: "Travel desk", text: "[Contact name & phone for pickups and travel questions.]" },
  ],
};

export const RSVP = {
  kicker: "Check-in counter",
  title: "RSVP",
  deadline: "[date]",
  // WhatsApp number that receives replies: country code + number, no "+" or spaces, e.g. "919812345678"
  whatsapp: "",
  labels: {
    name: "Your name(s)", namePlaceholder: "e.g. Riya & Arjun Sharma",
    coming: "Will you be boarding?", yes: "Yes, joyfully!", no: "Sadly, can't make it",
    guests: "Number of guests", events: "Which events?",
    diet: "Dietary needs (optional)", dietPlaceholder: "Vegetarian, Jain, allergies…",
    note: "A note for the couple (optional)",
    send: "Send RSVP on WhatsApp", sendDisabled: "RSVP opens soon",
    help: "This opens WhatsApp with your answers filled in. Just hit send.",
    todo: "Set the WhatsApp number that should receive RSVPs (js/config/pages.js → RSVP.whatsapp).",
  },
  maxGuests: 10,
};
