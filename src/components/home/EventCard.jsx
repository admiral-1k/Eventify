import { CalendarDays, Heart, MapPin, Share2, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import { formatEventDate, formatPrice } from "../../data/eventStore";

export default function EventCard({ event, onBook, onFavorite, onShare, isFavorite = false }) {
  return (
    <article
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-white
      shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <Link to={`/events/${event.id}`} className="block aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            {event.category}
          </span>

          <span className="text-sm font-bold text-neutral-900">
            {typeof event.price === "number" ? formatPrice(event.price) : event.price}
          </span>
        </div>

        <Link to={`/events/${event.id}`} className="line-clamp-2 text-base font-bold text-neutral-950 hover:text-orange-600">
          {event.title}
        </Link>

        <div className="mt-3 space-y-2 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{event.date?.includes("-") ? formatEventDate(event.date) : event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.country ? `${event.location}, ${event.country}` : event.location}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_44px_44px] gap-2">
          <Button onClick={() => onBook?.(event)} className="w-full gap-2">
            <Ticket size={17} />
            {event.buttonText || "Book Ticket"}
          </Button>
          <button
            type="button"
            onClick={() => onFavorite?.(event)}
            className={`flex h-11 items-center justify-center rounded-full border transition ${
              isFavorite
                ? "border-rose-200 bg-rose-50 text-rose-600"
                : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"
            }`}
            aria-label="Save event"
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={() => onShare?.(event)}
            className="flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50"
            aria-label="Share event"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
