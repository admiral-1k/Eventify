import { Heart, Ticket } from "lucide-react";
import { eventStore, formatEventDate, formatPrice } from "../data/eventStore";
import { useAuth } from "../context/AuthContext";

export default function MyBookings({ mode = "bookings" }) {
  const { user } = useAuth();
  const events = eventStore.getEvents();
  const source = mode === "favorites" ? eventStore.getFavorites() : eventStore.getBookings();
  const records = source
    .filter((item) => item.userId === user?.id)
    .map((item) => ({ ...item, event: events.find((event) => event.id === item.eventId) }))
    .filter((item) => item.event);
  const Icon = mode === "favorites" ? Heart : Ticket;

  return (
    <section className="mx-auto max-w-6xl">
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Icon size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase text-orange-600">
              {mode === "favorites" ? "Saved Events" : "Ticket History"}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              {mode === "favorites" ? "My Favorites" : "My Bookings"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {records.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center text-neutral-500 shadow-sm">
            Nothing here yet. Browse events to {mode === "favorites" ? "save favorites" : "book tickets"}.
          </div>
        ) : (
          records.map((record) => (
            <article key={record.id} className="grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-[180px_1fr_auto] md:items-center">
              <img src={record.event.image} alt={record.event.title} className="h-36 w-full rounded-lg object-cover md:h-28" />
              <div>
                <h2 className="text-lg font-bold">{record.event.title}</h2>
                <p className="mt-1 text-sm text-neutral-500">{record.event.description}</p>
                <p className="mt-3 text-sm font-semibold text-neutral-700">
                  {formatEventDate(record.event.date)} - {record.event.time} - {record.event.venue}
                </p>
                {mode === "bookings" && (
                  <p className="mt-2 text-xs font-semibold uppercase text-neutral-500">
                    Pass: {record.ticketType || "General"} {record.seat ? `- Seat ${record.seat}` : ""}
                  </p>
                )}
              </div>
              <div className="rounded-lg bg-neutral-50 px-4 py-3 text-sm font-bold text-neutral-800">
                {formatPrice(record.price ?? record.event.price)}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
