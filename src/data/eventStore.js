import bandPoster from "../assets/images/bandPoster.jpeg";
import newariFood from "../assets/images/newariFood.png";
import sport from "../assets/images/sport.png";
import artshow from "../assets/images/artshow.png";
import culturalEvent from "../assets/images/culturalevent.png";
import musicFestival from "../assets/images/musicfestival.png";

export const initialCategories = ["Music", "Food", "Sports", "Art", "Culture", "Business"];

export const roleLabels = {
  user: "User",
  eventor: "Event Manager",
  superadmin: "Super Admin",
};

export const initialEvents = [
  {
    id: 1,
    title: "Band Concert Night",
    category: "Music",
    date: "2026-07-20",
    time: "18:30",
    country: "Nepal",
    location: "Kathmandu",
    venue: "XO Club",
    price: 500,
    capacity: 240,
    booked: 84,
    status: "approved",
    manager: "Eventify Live",
    image: bandPoster,
    description: "A high-energy live music night with local bands, food stalls, and reserved seating.",
  },
  {
    id: 2,
    title: "Newari Food Festival",
    category: "Food",
    date: "2026-07-25",
    time: "11:00",
    country: "Nepal",
    location: "Bhaktapur",
    venue: "Durbar Square",
    price: 0,
    capacity: 600,
    booked: 210,
    status: "approved",
    manager: "Heritage Events",
    image: newariFood,
    description: "A cultural food fair featuring Newari cuisine, live demos, and family activities.",
  },
  {
    id: 3,
    title: "Sports Championship",
    category: "Sports",
    date: "2026-08-10",
    time: "15:00",
    country: "Nepal",
    location: "Kathmandu",
    venue: "National Stadium",
    price: 300,
    capacity: 1200,
    booked: 420,
    status: "approved",
    manager: "Arena Sports",
    image: sport,
    description: "Regional teams compete in a one-day championship with fan zones and food courts.",
  },
  {
    id: 4,
    title: "Contemporary Art Show",
    category: "Art",
    date: "2026-08-18",
    time: "13:00",
    country: "Nepal",
    location: "Lalitpur",
    venue: "City Gallery",
    price: 200,
    capacity: 180,
    booked: 52,
    status: "pending",
    manager: "Canvas House",
    image: artshow,
    description: "An indoor exhibition with emerging artists, installations, and a guided evening tour.",
  },
  {
    id: 5,
    title: "Cultural Evening",
    category: "Culture",
    date: "2026-09-02",
    time: "17:00",
    country: "Nepal",
    location: "Patan",
    venue: "Patan Museum",
    price: 350,
    capacity: 300,
    booked: 76,
    status: "approved",
    manager: "Culture Circle",
    image: culturalEvent,
    description: "Traditional performances, craft stalls, and community storytelling in a historic venue.",
  },
  {
    id: 6,
    title: "Mountain Music Festival",
    category: "Music",
    date: "2026-09-14",
    time: "14:00",
    country: "Nepal",
    location: "Pokhara",
    venue: "Lakeside Grounds",
    price: 1200,
    capacity: 1600,
    booked: 690,
    status: "approved",
    manager: "Summit Stage",
    image: musicFestival,
    description: "A full-day outdoor music festival with multiple stages, food zones, and VIP passes.",
  },
];

export const initialTickets = [
  {
    id: 1,
    subject: "Refund request for date change",
    eventTitle: "Band Concert Night",
    priority: "High",
    status: "Open",
    message: "I cannot attend on the rescheduled date and need help with a refund.",
    createdAt: "2026-07-09",
  },
];

export const initialBookings = [
  {
    id: 1,
    eventId: 1,
    userId: 100,
    status: "Confirmed",
    quantity: 1,
    ticketType: "VIP",
    seat: "A1",
    price: 1000,
    bookedAt: "2026-07-10",
  },
  {
    id: 2,
    eventId: 3,
    userId: 100,
    status: "Confirmed",
    quantity: 2,
    ticketType: "General",
    seat: "B4",
    price: 300,
    bookedAt: "2026-07-11",
  },
];

const keys = {
  events: "eventify_events",
  bookings: "eventify_bookings",
  favorites: "eventify_favorites",
  tickets: "eventify_support_tickets",
  users: "eventify_local_users",
  categories: "eventify_categories",
};

const read = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const eventStore = {
  getEvents: () => read(keys.events, initialEvents),
  saveEvents: (events) => write(keys.events, events),
  getBookings: () => read(keys.bookings, initialBookings),
  saveBookings: (bookings) => write(keys.bookings, bookings),
  getFavorites: () => read(keys.favorites, []),
  saveFavorites: (favorites) => write(keys.favorites, favorites),
  getTickets: () => read(keys.tickets, initialTickets),
  saveTickets: (tickets) => write(keys.tickets, tickets),
  getUsers: () =>
    read(keys.users, [
      { id: 100, fullname: "Demo User", email: "user@eventify.com", role: "user", accountStatus: "approved" },
      {
        id: 101,
        fullname: "Demo Manager",
        email: "manager@eventify.com",
        role: "eventor",
        companyName: "Eventify Live",
        phone: "9800000000",
        accountStatus: "approved",
      },
      { id: 102, fullname: "Demo Admin", email: "admin@eventify.com", role: "superadmin", accountStatus: "approved" },
    ]),
  saveUsers: (users) => write(keys.users, users),
  getCategories: () => read(keys.categories, initialCategories),
  saveCategories: (categories) => write(keys.categories, categories),
};

export const getEventAttendees = (eventId) => {
  const users = eventStore.getUsers();
  return eventStore
    .getBookings()
    .filter((booking) => booking.eventId === eventId)
    .map((booking) => ({
      ...booking,
      user: users.find((user) => user.id === booking.userId),
    }))
    .filter((booking) => booking.user);
};

export const getTicketTypes = (event) => {
  if (Array.isArray(event.ticketTypes) && event.ticketTypes.length > 0) {
    return event.ticketTypes;
  }

  const basePrice = Number(event.price || 0);
  const vipPrice = basePrice === 0 ? 500 : basePrice + 500;
  const vvipPrice = basePrice === 0 ? 1200 : basePrice + 1200;

  return [
    {
      name: "General",
      price: basePrice,
      description: "Standard event entry",
    },
    {
      name: "VIP",
      price: vipPrice,
      description: "Priority entry with better seat options",
    },
    {
      name: "VVIP",
      price: vvipPrice,
      description: "Premium pass with front-zone seating",
    },
  ];
};

export const getSeatOptions = (event) => {
  const capacity = Number(event.capacity || 40);
  const seatsPerRow = Math.min(10, Math.max(6, Math.ceil(capacity / 40)));
  const rowCount = Math.min(8, Math.max(4, Math.ceil(capacity / seatsPerRow / 30)));
  const rows = "ABCDEFGH".slice(0, rowCount).split("");

  return rows.flatMap((row) =>
    Array.from({ length: seatsPerRow }, (_, index) => `${row}${index + 1}`)
  );
};

export const getBookedSeats = (eventId) =>
  eventStore
    .getBookings()
    .filter((booking) => booking.eventId === eventId && booking.seat)
    .map((booking) => booking.seat);

export const formatEventDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

export const formatPrice = (price) => (Number(price) === 0 ? "Entry Free" : `Rs. ${price}`);
