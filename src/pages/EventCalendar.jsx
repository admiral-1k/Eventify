<<<<<<< Updated upstream
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { eventStore, formatEventDate, formatPrice } from "../data/eventStore";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EventCalendar({ bookedOnly = false }) {
  const { user } = useAuth();
  const approvedEvents = eventStore.getEvents().filter((event) => event.status === "approved");
  const bookedEventIds = eventStore
    .getBookings()
    .filter((booking) => booking.userId === user?.id)
    .map((booking) => booking.eventId);
  const events = bookedOnly
    ? approvedEvents.filter((event) => bookedEventIds.includes(event.id))
    : approvedEvents;
  const firstEventDate = events[0]?.date ? new Date(`${events[0].date}T00:00:00`) : new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(firstEventDate.getFullYear(), firstEventDate.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState(null);

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    for (let index = 0; index < firstDay; index += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      cells.push({
        day,
        dateKey,
        events: events.filter((event) => event.date === dateKey),
      });
    }
    return cells;
  }, [currentMonth, events]);

  const moveMonth = (direction) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1)
    );
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-orange-600">
              {bookedOnly ? "Profile Calendar" : "Calendar"}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {currentMonth.toLocaleString("en", { month: "long", year: "numeric" })}
            </h1>
            {bookedOnly && (
              <p className="mt-2 text-sm text-neutral-500">Shows you booked are shown inside your profile calendar.</p>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => moveMonth(-1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => moveMonth(1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 border-l border-t border-neutral-200 text-center text-xs font-bold uppercase text-neutral-500">
          {weekdays.map((day) => (
            <div key={day} className="border-b border-r border-neutral-200 bg-neutral-50 py-3">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 border-l border-neutral-200 sm:grid-cols-7">
          {days.map((cell, index) => (
            <div
              key={cell?.dateKey || `empty-${index}`}
              onClick={() => {
                if (cell) setSelectedDay(cell);
              }}
              className={`min-h-36 border-b border-r border-neutral-200 bg-white p-3 text-left ${
                cell ? "cursor-pointer transition hover:bg-orange-50/40" : ""
              }`}
            >
              {cell && (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-neutral-800">{cell.day}</p>
                    {cell.events.length > 0 && (
                      <span className="rounded-full bg-neutral-900 px-2 py-1 text-[10px] font-bold text-white">
                        {cell.events.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-2">
                    {cell.events.slice(0, 2).map((event) => (
                      <div key={event.id} className="rounded-lg bg-orange-50 p-2 text-left">
                        <p className="text-xs font-bold text-orange-800">{event.title}</p>
                        <p className="mt-1 text-[11px] text-orange-700">{event.time} | {formatPrice(event.price)}</p>
                      </div>
                    ))}
                    {cell.events.length > 2 && (
                      <p className="text-xs font-semibold text-neutral-500">+{cell.events.length - 2} more events</p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {bookedOnly && events.length === 0 && (
          <div className="mt-4 rounded-lg bg-neutral-50 p-5 text-sm text-neutral-500">
            No booked shows yet. Book an event to add it to your calendar.
          </div>
        )}
      </div>

      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
              <div>
                <p className="text-sm font-semibold uppercase text-orange-600">
                  {formatEventDate(selectedDay.dateKey)}
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  {selectedDay.events.length} event{selectedDay.events.length === 1 ? "" : "s"} scheduled
                </h2>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                aria-label="Close calendar popup"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-5">
              {selectedDay.events.length === 0 ? (
                <p className="rounded-lg bg-neutral-50 p-5 text-sm text-neutral-500">No events on this date.</p>
              ) : (
                <div className="space-y-3">
                  {selectedDay.events.map((event) => (
                    <article key={event.id} className="rounded-lg border border-neutral-200 p-4">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-xs font-bold uppercase text-neutral-500">{event.category}</p>
                          <h3 className="mt-1 text-lg font-bold text-neutral-900">{event.title}</h3>
                          <p className="mt-2 text-sm text-neutral-500">
                            {event.time} - {event.venue}, {event.location}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold text-neutral-900">{formatPrice(event.price)}</p>
                          <Link
                            to={`/events/${event.id}`}
                            className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-orange-600 px-3 text-xs font-semibold text-white hover:bg-orange-700"
                          >
                            View event
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
=======
import "./EventCalendar.css";

export default function EventCalendar() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#4b3567] mb-10">
          Event Calendar
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <p className="text-lg text-gray-600">
            Event Calendar page is under development.
          </p>
        </div>
      </div>
    </div>
  );
}
>>>>>>> Stashed changes
