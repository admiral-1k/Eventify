import { CalendarDays, Heart, MapPin, Share2, Ticket, Users } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import EventCard from "../components/home/EventCard";
import { useAuth } from "../context/AuthContext";
import {
  eventStore,
  formatEventDate,
  formatPrice,
  getBookedSeats,
  getEventAttendees,
  getSeatOptions,
  getTicketTypes,
} from "../data/eventStore";
import { bookEventForUser, shareEvent as shareEventAction, toggleFavoriteForUser } from "../utils/eventActions";

export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [events, setEvents] = useState(eventStore.getEvents());
  const [favorites, setFavorites] = useState(eventStore.getFavorites());
  const [selectedTicketType, setSelectedTicketType] = useState("General");
  const [selectedSeat, setSelectedSeat] = useState("");
  const event = events.find((item) => String(item.id) === String(id));

  if (!event || event.status !== "approved") {
    return <Navigate to="/events" replace />;
  }

  const attendeeCount = getEventAttendees(event.id).length;
  const relatedEvents = events
    .filter((item) => item.status === "approved" && item.id !== event.id && item.category === event.category)
    .slice(0, 3);
  const isFavorite = favorites.some(
    (favorite) => favorite.eventId === event.id && favorite.userId === user?.id
  );
  const bookedPercent = Math.min(100, (Number(event.booked || 0) / Number(event.capacity || 1)) * 100);
  const ticketTypes = getTicketTypes(event);
  const activeTicket = ticketTypes.find((ticket) => ticket.name === selectedTicketType) || ticketTypes[0];
  const seatOptions = getSeatOptions(event);
  const bookedSeats = getBookedSeats(event.id);

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="aspect-[16/10] bg-neutral-100 lg:aspect-auto">
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">{event.category}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{event.status}</span>
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{event.title}</h1>
              <div
                className="mt-4 text-sm leading-6 text-neutral-600 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Info icon={CalendarDays} label="Date and time" value={`${formatEventDate(event.date)} at ${event.time}`} />
                <Info icon={MapPin} label="Location" value={`${event.venue}, ${event.location}, ${event.country}`} />
                <Info icon={Ticket} label="Ticket price" value={formatPrice(event.price)} />
                <Info icon={Users} label="People joined" value={`${attendeeCount} visible attendee${attendeeCount === 1 ? "" : "s"}`} />
              </div>

              <div className="mt-6 rounded-lg bg-neutral-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Booked seats</span>
                  <span className="text-neutral-500">{event.booked} / {event.capacity}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-neutral-200">
                  <div className="h-2 rounded-full bg-orange-600" style={{ width: `${bookedPercent}%` }} />
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-neutral-200 p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase text-orange-600">Pass type</p>
                    <h2 className="text-lg font-bold text-neutral-900">Choose your ticket</h2>
                  </div>
                  <span className="text-sm font-semibold text-neutral-600">{formatPrice(activeTicket?.price || 0)}</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {ticketTypes.map((ticket) => {
                    const isSelected = activeTicket?.name === ticket.name;
                    return (
                      <button
                        key={ticket.name}
                        type="button"
                        onClick={() => setSelectedTicketType(ticket.name)}
                        className={`rounded-lg border p-3 text-left transition ${
                          isSelected
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-orange-200"
                        }`}
                      >
                        <span className="block text-sm font-bold">{ticket.name}</span>
                        <span className="mt-1 block text-sm">{formatPrice(ticket.price)}</span>
                        <span className="mt-2 block text-xs leading-5 text-neutral-500">{ticket.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-neutral-200 p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase text-orange-600">Seat allocation</p>
                    <h2 className="text-lg font-bold text-neutral-900">Select a seat</h2>
                  </div>
                  <p className="text-sm text-neutral-500">{selectedSeat ? `Seat ${selectedSeat}` : "No seat selected"}</p>
                </div>
                <div className="mt-4 grid grid-cols-6 gap-2 sm:grid-cols-8">
                  {seatOptions.map((seat) => {
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeat === seat;
                    return (
                      <button
                        key={seat}
                        type="button"
                        disabled={isBooked}
                        onClick={() => setSelectedSeat(seat)}
                        className={`h-10 rounded-md border text-xs font-bold transition ${
                          isBooked
                            ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
                            : isSelected
                              ? "border-orange-500 bg-orange-600 text-white"
                              : "border-neutral-200 bg-white text-neutral-700 hover:border-orange-300"
                        }`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-white ring-1 ring-neutral-300" />Available</span>
                  <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-orange-600" />Selected</span>
                  <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-neutral-200" />Booked</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[1fr_48px_48px] gap-3">
                <button
                  disabled={!selectedSeat}
                  onClick={() => {
                    const result = bookEventForUser(event, user, events, {
                      ticketType: activeTicket?.name,
                      seat: selectedSeat,
                      price: activeTicket?.price,
                    });
                    setEvents(result.events);
                  }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-orange-600 text-sm font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  <Ticket size={18} />
                  {selectedSeat ? "Book ticket" : "Select a seat"}
                </button>
                <button
                  onClick={() => {
                    const result = toggleFavoriteForUser(event, user, favorites);
                    setFavorites(result.favorites);
                  }}
                  className={`flex h-12 items-center justify-center rounded-lg border ${
                    isFavorite ? "border-rose-200 bg-rose-50 text-rose-600" : "border-neutral-200 bg-white text-neutral-600"
                  }`}
                  aria-label="Save event"
                >
                  <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => shareEventAction(event)}
                  className="flex h-12 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600"
                  aria-label="Share event"
                >
                  <Share2 size={19} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase text-orange-600">More like this</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">{event.category} events</h2>
            </div>
            <Link to={`/events?category=${encodeURIComponent(event.category)}`} className="text-sm font-semibold text-orange-600">
              View category
            </Link>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedEvents.map((relatedEvent) => (
              <EventCard
                key={relatedEvent.id}
                event={relatedEvent}
                onBook={(selectedEvent) => {
                  const result = bookEventForUser(selectedEvent, user, events);
                  setEvents(result.events);
                }}
                onFavorite={(selectedEvent) => {
                  const result = toggleFavoriteForUser(selectedEvent, user, favorites);
                  setFavorites(result.favorites);
                }}
                onShare={shareEventAction}
                isFavorite={favorites.some(
                  (favorite) => favorite.eventId === relatedEvent.id && favorite.userId === user?.id
                )}
              />
            ))}
          </div>
          {relatedEvents.length === 0 && (
            <p className="mt-4 rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">
              No related events in this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <Icon size={18} className="text-orange-600" />
      <p className="mt-3 text-xs font-semibold uppercase text-neutral-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-neutral-800">{value}</p>
    </div>
  );
}
