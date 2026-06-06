import { CalendarDays, MapPin } from "lucide-react";
import Button from "../common/Button";

export default function EventCard({ event }) {
  return (
    <article
      className="overflow-hidden rounded-2xl border border-neutral-100 bg-white
      shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            {event.category}
          </span>

          <span className="text-sm font-bold text-neutral-900">
            {event.price}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base font-bold text-neutral-950">
          {event.title}
        </h3>

        <div className="mt-3 space-y-2 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>

        <Button className="mt-5 w-full">
          {event.buttonText || "Book Ticket"}
        </Button>
      </div>
    </article>
  );
}