import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import EventCard from "../components/home/EventCard";
import { eventStore } from "../data/eventStore";
import { useAuth } from "../context/AuthContext";
import countries from "../data/countries.json";
import { bookEventForUser, shareEvent, toggleFavoriteForUser } from "../utils/eventActions";

export default function AllEvents() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState(eventStore.getEvents());
  const [favorites, setFavorites] = useState(eventStore.getFavorites());
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [country, setCountry] = useState(searchParams.get("country") || "All");
  const [sort, setSort] = useState("date");

  const categories = ["All", ...eventStore.getCategories()];
  const countryOptions = ["All", ...countries.map((item) => item.name)];
  const approvedEvents = events.filter((event) => event.status === "approved");

  const visibleEvents = useMemo(() => {
    const filtered = approvedEvents.filter((event) => {
      const matchesSearch = `${event.title} ${event.location} ${event.country} ${event.category} ${event.venue}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "All" || event.category === category;
      const matchesCountry = country === "All" || event.country === country;
      return matchesSearch && matchesCategory && matchesCountry;
    });

    return filtered.sort((a, b) => {
      if (sort === "popular") return Number(b.booked || 0) - Number(a.booked || 0);
      if (sort === "price-low") return Number(a.price || 0) - Number(b.price || 0);
      if (sort === "price-high") return Number(b.price || 0) - Number(a.price || 0);
      return new Date(a.date) - new Date(b.date);
    });
  }, [approvedEvents, query, category, country, sort]);

  const updateFilter = (name, value) => {
    const next = {
      q: query,
      category,
      country,
      [name]: value,
    };
    Object.keys(next).forEach((key) => {
      if (!next[key] || next[key] === "All") delete next[key];
    });
    setSearchParams(next);
  };

  const categoryStats = categories
    .filter((item) => item !== "All")
    .map((item) => ({
      name: item,
      count: approvedEvents.filter((event) => event.category === item).length,
    }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-orange-600">Events</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Find and book events</h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-500">
              Search across events, filter by category and country, then open an event page for full details.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex h-11 min-w-64 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3">
              <Search size={18} className="text-neutral-400" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  updateFilter("q", event.target.value);
                }}
                placeholder="Search title, place, venue"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>
            <FilterSelect value={category} onChange={(value) => { setCategory(value); updateFilter("category", value); }} options={categories} />
            <FilterSelect value={country} onChange={(value) => { setCountry(value); updateFilter("country", value); }} options={countryOptions} />
            <FilterSelect
              label="Sort"
              value={sort}
              onChange={setSort}
              options={[
                ["date", "Soonest"],
                ["popular", "Popular"],
                ["price-low", "Price low"],
                ["price-high", "Price high"],
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 grid overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm md:grid-cols-3">
        <StatCard label="Approved Events" value={approvedEvents.length} />
        <StatCard label="Categories" value={eventStore.getCategories().length} />
        <StatCard label="Countries" value={new Set(approvedEvents.map((event) => event.country)).size} />
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => {
            setCategory("All");
            updateFilter("category", "All");
          }}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${category === "All" ? "bg-orange-600 text-white" : "bg-white text-neutral-700"}`}
        >
          All
        </button>
        {categoryStats.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setCategory(item.name);
              updateFilter("category", item.name);
            }}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${category === item.name ? "bg-orange-600 text-white" : "bg-white text-neutral-700"}`}
          >
            {item.name} ({item.count})
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onBook={(selectedEvent) => {
              const result = bookEventForUser(selectedEvent, user, events);
              setEvents(result.events);
            }}
            onFavorite={(selectedEvent) => {
              const result = toggleFavoriteForUser(selectedEvent, user, favorites);
              setFavorites(result.favorites);
            }}
            onShare={shareEvent}
            isFavorite={favorites.some(
              (favorite) => favorite.eventId === event.id && favorite.userId === user?.id
            )}
          />
        ))}
      </div>

      {visibleEvents.length === 0 && (
        <div className="mt-6 rounded-lg bg-white p-8 text-center text-sm text-neutral-500 shadow-sm">
          No events matched your filters.
        </div>
      )}
    </section>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 rounded-lg border border-neutral-200 bg-white px-3 text-sm font-semibold outline-none"
    >
      {options.map((item) => {
        const value = Array.isArray(item) ? item[0] : item;
        const label = Array.isArray(item) ? item[1] : item;
        return <option key={value} value={value}>{label}</option>;
      })}
    </select>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border-b border-neutral-200 p-4 md:border-b-0 md:border-r last:md:border-r-0">
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-neutral-500">{label}</p>
    </div>
  );
}
