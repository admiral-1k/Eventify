import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import EventCard from "./EventCard";
import { eventStore } from "../../data/eventStore";
import { useAuth } from "../../context/AuthContext";
import { bookEventForUser, shareEvent, toggleFavoriteForUser } from "../../utils/eventActions";

export default function FeaturedEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState(eventStore.getEvents());
  const [favorites, setFavorites] = useState(eventStore.getFavorites());
  const featuredEvents = events
    .filter((event) => event.status === "approved")
    .slice(0, 3);

  return (
    <section className="py-10">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Explore Events
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              Featured Events
            </h2>
          </div>

          <Link to="/events" className="hidden text-sm font-semibold text-orange-600 hover:text-orange-700 sm:block">
            View all
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
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
      </Container>
    </section>
  );
}
