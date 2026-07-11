import { CalendarDays, Heart, LifeBuoy, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { eventStore, formatEventDate, formatPrice } from "../data/eventStore";
import { useAuth } from "../context/AuthContext";
import DashboardStat from "../components/common/DashboardStat";

export default function UserDashboard() {
  const { user } = useAuth();
  const events = eventStore.getEvents();
  const bookings = eventStore.getBookings().filter((booking) => booking.userId === user?.id);
  const favorites = eventStore.getFavorites().filter((favorite) => favorite.userId === user?.id);
  const tickets = eventStore.getTickets().filter((ticket) => !ticket.userId || ticket.userId === user?.id);
  const bookedEvents = bookings
    .map((booking) => ({ ...booking, event: events.find((event) => event.id === booking.eventId) }))
    .filter((booking) => booking.event);

  const stats = [
    { label: "Bookings", value: bookings.length, icon: Ticket },
    { label: "Favorites", value: favorites.length, icon: Heart },
    { label: "Upcoming", value: bookedEvents.length, icon: CalendarDays },
    { label: "Support Tickets", value: tickets.length, icon: LifeBuoy },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 rounded-lg bg-white p-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-orange-600">User Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Welcome, {user?.fullname}</h1>
          <p className="mt-2 text-sm text-neutral-500">Track your bookings, saved events, and support requests.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/events" className="inline-flex h-11 items-center justify-center rounded-lg bg-orange-600 px-5 text-sm font-semibold text-white">
            Book an event
          </Link>
          <Link to="/my-calendar" className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-200 px-5 text-sm font-semibold text-neutral-700">
            My calendar
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          return (
            <DashboardStat key={item.label} icon={item.icon} label={item.label} value={item.value} helper="Updated from your activity" />
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-lg bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">My Bookings</h2>
            <Link to="/my-bookings" className="text-sm font-semibold text-orange-600">View all</Link>
          </div>
          <div className="overflow-x-auto">
            {bookedEvents.length === 0 ? (
              <p className="rounded-lg bg-neutral-50 p-4 text-sm text-neutral-500">No bookings yet.</p>
            ) : (
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-neutral-200 text-xs uppercase text-neutral-500">
                  <tr>
                    <th className="py-3">Event</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Pass</th>
                    <th>Seat</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookedEvents.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="border-b border-neutral-100">
                      <td className="py-4 font-semibold">{booking.event.title}</td>
                      <td>{formatEventDate(booking.event.date)}</td>
                      <td>{booking.event.venue}</td>
                      <td>{booking.ticketType || "General"}</td>
                      <td>{booking.seat || "-"}</td>
                      <td>{formatPrice(booking.price ?? booking.event.price)}</td>
                      <td><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{booking.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Recommended Next</h2>
          <div className="mt-4 space-y-3">
            {events
              .filter((event) => event.status === "approved")
              .slice(0, 3)
              .map((event) => (
                <Link key={event.id} to="/events" className="block rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <p className="font-semibold">{event.title}</p>
                  <p className="mt-1 text-sm text-neutral-500">{formatPrice(event.price)} - {formatEventDate(event.date)}</p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
