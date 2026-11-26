// ─────────────────────────────────────────────────────────────
//  SCHEDULE: one entry per day, each with its events.
//  Used by the boarding passes on the invitation, the Events page
//  and the RSVP checkboxes. Add, remove or reorder freely.
//
//  leg        : heading on the invitation's boarding pass
//  inItinerary: false hides an event from the boarding pass (still on Events page)
//  rsvp       : false leaves it out of the RSVP checkboxes
// ─────────────────────────────────────────────────────────────

export const DAYS = [
  {
    weekday: "Friday", day: "22", month: "JAN", date: "22 January 2027",
    leg: "Take off",
    events: [
      { time: "8:00 PM", name: "Welcome Dinner", dress: "Smart casual",
        note: "Comfortable and polished. January evenings can be cool, so bring a light layer." },
      { time: "11:00 PM", name: "After Party", dress: "Party wear",
        note: "Sequins, shimmer and dancing shoes." },
    ],
  },
  {
    weekday: "Saturday", day: "23", month: "JAN", date: "23 January 2027",
    leg: "Cruising altitude",
    events: [
      { time: "12:00 PM", name: "Carnival & Pool Party", dress: "Bright & breezy",
        note: "Colourful casuals and sunglasses. Bring swimwear for the pool." },
      { time: "7:00 PM", name: "Reception", dress: "Glam / Indo-western",
        note: "Cocktail gowns, sarees, sherwanis or sharp suits." },
    ],
  },
  {
    weekday: "Sunday", day: "24", month: "JAN", date: "24 January 2027",
    leg: "Final approach",
    events: [
      { time: "10:00 AM", name: "Baraat & Phere", dress: "Traditional Indian",
        note: "Lehengas, sarees, kurtas and safas. Get ready to dance in the baraat!" },
      { time: "After the Phere", name: "Lunch", note: "Join us for lunch after the ceremony.",
        inItinerary: false, itineraryNote: "followed by lunch", rsvp: false },
    ],
  },
];

export const EVENTS_PAGE = {
  kicker: "All celebrations at a glance",
  title: "Events",
  directions: "Directions",
  print: "Print this page",
  dressLabel: "Dress code:",
  todo: "Dress codes are my suggestions. Tell me the real ones and I'll update them.",
};

export const LEG_LABEL = (i) => `Itinerary · Leg ${["I", "II", "III", "IV", "V", "VI"][i] ?? i + 1}`;
