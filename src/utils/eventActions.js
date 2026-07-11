import toast from "react-hot-toast";
import { eventStore } from "../data/eventStore";

export const bookEventForUser = (event, user, events = eventStore.getEvents(), options = {}) => {
  if (!user) {
    toast.error("Please sign in before booking.");
    return { events, changed: false };
  }

  const bookings = eventStore.getBookings();
  const selectedSeat = options.seat || "";
  const alreadyBooked = bookings.some(
    (booking) => booking.eventId === event.id && booking.userId === user.id
  );
  const seatTaken = selectedSeat && bookings.some(
    (booking) => booking.eventId === event.id && booking.seat === selectedSeat
  );

  if (alreadyBooked) {
    toast("This event is already in your bookings.");
    return { events, changed: false };
  }

  if (selectedSeat && seatTaken) {
    toast.error("That seat is already booked. Please select another seat.");
    return { events, changed: false };
  }

  const nextBookings = [
    ...bookings,
    {
      id: Date.now(),
      eventId: event.id,
      userId: user.id,
      status: "Confirmed",
      quantity: Number(options.quantity || 1),
      ticketType: options.ticketType || "General",
      seat: selectedSeat,
      price: Number(options.price ?? event.price ?? 0),
      bookedAt: new Date().toISOString().slice(0, 10),
    },
  ];
  const nextEvents = events.map((item) =>
    item.id === event.id ? { ...item, booked: Number(item.booked || 0) + 1 } : item
  );

  eventStore.saveBookings(nextBookings);
  eventStore.saveEvents(nextEvents);
  toast.success("Ticket booked successfully.");
  return { events: nextEvents, changed: true };
};

export const toggleFavoriteForUser = (event, user, favorites = eventStore.getFavorites()) => {
  if (!user) {
    toast.error("Please sign in before saving favorites.");
    return { favorites, changed: false };
  }

  const exists = favorites.some(
    (favorite) => favorite.eventId === event.id && favorite.userId === user.id
  );
  const nextFavorites = exists
    ? favorites.filter((favorite) => !(favorite.eventId === event.id && favorite.userId === user.id))
    : [...favorites, { id: Date.now(), eventId: event.id, userId: user.id }];

  eventStore.saveFavorites(nextFavorites);
  toast.success(exists ? "Removed from favorites." : "Saved to favorites.");
  return { favorites: nextFavorites, changed: true };
};

export const shareEvent = async (event) => {
  const url = `${window.location.origin}/events/${event.id}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: event.title, text: event.description, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Event link copied.");
    }
  } catch {
    toast.error("Unable to share this event.");
  }
};
