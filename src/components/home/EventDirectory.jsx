import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Container from "../common/Container";
import { eventStore, formatEventDate, formatPrice } from "../../data/eventStore";

export default function EventDirectory() {
  const events = eventStore.getEvents().filter((event) => event.status === "approved");
  const countries = [...new Set(events.map((event) => event.country))].sort();
  const categories = eventStore.getCategories().sort((a, b) => a.localeCompare(b));
  const upcoming = [...events].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);

  return (
    <section className="py-10">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase text-orange-600">Upcoming</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">Next shows</h2>
              </div>
              <Link to="/event-calendar" className="text-sm font-semibold text-orange-600">Calendar</Link>
            </div>
            <div className="space-y-3">
              {upcoming.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`} className="grid gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                  <img src={event.image} alt={event.title} className="h-20 w-24 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold">{event.title}</p>
                    <p className="mt-1 text-sm text-neutral-500">{formatEventDate(event.date)} | {event.location}, {event.country}</p>
                  </div>
                  <span className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700">{formatPrice(event.price)}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase text-orange-600">Countries</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">Explore by location</h2>
              <div className="mt-4 grid gap-2">
                {countries.map((country) => (
                  <Link key={country} to={`/events?country=${encodeURIComponent(country)}`} className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-3 text-sm font-semibold hover:bg-neutral-50">
                    <span className="inline-flex items-center gap-2"><MapPin size={16} />{country}</span>
                    <span className="text-neutral-400">{events.filter((event) => event.country === country).length}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase text-orange-600">A-Z</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">Category directory</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link key={category} to={`/events?category=${encodeURIComponent(category)}`} className="rounded-full bg-neutral-100 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-orange-50 hover:text-orange-700">
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
