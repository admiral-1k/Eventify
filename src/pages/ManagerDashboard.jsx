import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CalendarPlus, CheckCircle2, Clock, Edit3, ImagePlus, Search, Ticket, Users } from "lucide-react";
import countries from "../data/countries.json";
import { eventStore, formatEventDate, formatPrice, getEventAttendees } from "../data/eventStore";
import { useAuth } from "../context/AuthContext";
import RichTextEditor from "../components/common/RichTextEditor";
import DashboardStat from "../components/common/DashboardStat";

const emptyEvent = {
  title: "",
  category: "Music",
  country: "Nepal",
  location: "Kathmandu",
  date: "",
  time: "",
  venue: "",
  price: 0,
  capacity: 100,
  description: "",
  image: "",
};

const normalizeEvent = (form, user, events, editingId) => ({
  id: editingId || Date.now(),
  ...form,
  price: Number(form.price),
  capacity: Number(form.capacity),
  booked: editingId ? events.find((event) => event.id === editingId)?.booked || 0 : 0,
  status: editingId ? events.find((event) => event.id === editingId)?.status || "pending" : "pending",
  manager: editingId ? events.find((event) => event.id === editingId)?.manager : user?.fullname || "Event Manager",
  image: form.image || (editingId ? events.find((event) => event.id === editingId)?.image : events[0]?.image),
});

export default function ManagerDashboard({ createOnly = false }) {
  const { user } = useAuth();
  const [events, setEvents] = useState(eventStore.getEvents());
  const [categories] = useState(eventStore.getCategories());
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyEvent);
  const [editingId, setEditingId] = useState(null);
  const [attendeeEventId, setAttendeeEventId] = useState(null);
  const verified = user?.accountStatus === "approved";

  const selectedCountry = countries.find((country) => country.name === form.country) || countries[0];
  const managerEvents = events.filter(
    (event) => event.manager === user?.fullname || event.manager === "Eventify Live"
  );
  const filteredEvents = useMemo(
    () =>
      managerEvents.filter((event) =>
        `${event.title} ${event.category} ${event.country} ${event.location} ${event.status}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [managerEvents, query]
  );
  const totalBookings = managerEvents.reduce((sum, event) => sum + Number(event.booked || 0), 0);
  const attendees = attendeeEventId ? getEventAttendees(attendeeEventId) : [];

  const updateForm = (name, value) => {
    if (name === "country") {
      const nextCountry = countries.find((country) => country.name === value);
      setForm({ ...form, country: value, location: nextCountry?.cities[0] || "" });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const uploadImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: reader.result }));
      toast.success("Event image added.");
    };
    reader.readAsDataURL(file);
  };

  const submitEvent = (event) => {
    event.preventDefault();
    if (!verified) {
      toast.error("Your event manager account is waiting for super admin verification.");
      return;
    }
    const eventData = normalizeEvent(form, user, events, editingId);
    const nextEvents = editingId
      ? events.map((item) => (item.id === editingId ? eventData : item))
      : [eventData, ...events];

    eventStore.saveEvents(nextEvents);
    setEvents(nextEvents);
    setForm(emptyEvent);
    setEditingId(null);
    toast.success(editingId ? "Event updated." : "Event submitted for super admin approval.");
  };

  const editEvent = (event) => {
    if (!verified) {
      toast.error("You can edit events after super admin verification.");
      return;
    }
    setEditingId(event.id);
    setForm({
      title: event.title,
      category: event.category,
      country: event.country || "Nepal",
      location: event.location,
      date: event.date,
      time: event.time,
      venue: event.venue,
      price: event.price,
      capacity: event.capacity,
      description: event.description,
      image: event.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl">
      {!createOnly && (
        <>
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase text-orange-600">Event Manager</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Event section</h1>
            <p className="mt-2 text-sm text-neutral-500">Create, edit, search, and review people who joined your events.</p>
            {!verified && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Your manager/company account is pending super admin verification. You can view this section, but event creation and editing are locked until approval.
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <DashboardStat icon={CalendarPlus} label="Managed Events" value={managerEvents.length} />
            <DashboardStat icon={Ticket} label="Tickets Booked" value={totalBookings} tone="emerald" />
            <DashboardStat icon={Clock} label="Pending Approval" value={managerEvents.filter((event) => event.status === "pending").length} tone="amber" />
          </div>
        </>
      )}

      <div className={`mt-6 grid gap-6 ${createOnly ? "" : "xl:grid-cols-[0.85fr_1.15fr]"}`}>
        <form onSubmit={submitEvent} className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">{editingId ? "Edit Event" : "Add Event"}</h2>
          {!verified && (
            <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              Event creation is disabled until super admin approves your manager/company account.
            </p>
          )}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold text-neutral-700">
              Title
              <input disabled={!verified} value={form.title} onChange={(event) => updateForm("title", event.target.value)} required className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500 disabled:bg-neutral-100" />
            </label>
            <label className="text-sm font-semibold text-neutral-700">
              Category
              <select disabled={!verified} value={form.category} onChange={(event) => updateForm("category", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500 disabled:bg-neutral-100">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-neutral-700">
              Country
              <select disabled={!verified} value={form.country} onChange={(event) => updateForm("country", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500 disabled:bg-neutral-100">
                {countries.map((country) => <option key={country.name}>{country.name}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-neutral-700">
              Location
              <select disabled={!verified} value={form.location} onChange={(event) => updateForm("location", event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500 disabled:bg-neutral-100">
                {selectedCountry.cities.map((city) => <option key={city}>{city}</option>)}
              </select>
            </label>
            {[
              ["date", "Date", "date"],
              ["time", "Time", "time"],
              ["venue", "Venue", "text"],
              ["price", "Ticket Price", "number"],
              ["capacity", "Capacity", "number"],
            ].map(([name, label, type]) => (
              <label key={name} className="text-sm font-semibold text-neutral-700">
                {label}
                <input disabled={!verified} type={type} value={form[name]} onChange={(event) => updateForm(name, event.target.value)} required className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500 disabled:bg-neutral-100" />
              </label>
            ))}
            <label className="text-sm font-semibold text-neutral-700 sm:col-span-2">
              Event image
              <div className="mt-2 grid gap-3 sm:grid-cols-[180px_1fr]">
                <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100">
                  {form.image ? (
                    <img src={form.image} alt="Event preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-neutral-400">
                      <ImagePlus size={28} />
                    </div>
                  )}
                </div>
                <input
                  disabled={!verified}
                  type="file"
                  accept="image/*"
                  onChange={(event) => uploadImage(event.target.files?.[0])}
                  className="h-11 rounded-lg border border-neutral-200 px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-orange-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-orange-700 disabled:bg-neutral-100"
                />
              </div>
            </label>
            <label className="text-sm font-semibold text-neutral-700 sm:col-span-2">
              Description
              <div className="mt-2">
                <RichTextEditor disabled={!verified} value={form.description} onChange={(value) => updateForm("description", value)} />
              </div>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button disabled={!verified} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-300">
              <CalendarPlus size={18} />
              {editingId ? "Save Changes" : "Submit Event"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm(emptyEvent); }} className="h-11 rounded-lg border border-neutral-200 px-5 text-sm font-semibold">
                Cancel
              </button>
            )}
          </div>
        </form>

        {!createOnly && (
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-lg font-bold">My Events</h2>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-neutral-200 px-3">
                <Search size={17} className="text-neutral-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events" className="w-full border-none bg-transparent text-sm outline-none" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {filteredEvents.map((event) => (
                <article key={event.id} className="rounded-lg border border-neutral-200 p-4">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <h3 className="font-bold">{event.title}</h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {formatEventDate(event.date)} | {event.country}, {event.location} | {event.venue} | {formatPrice(event.price)}
                      </p>
                    </div>
                    <span className={`inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-bold ${
                      event.status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {event.status === "approved" && <CheckCircle2 size={14} />}
                      {event.status}
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-neutral-100">
                    <div className="h-2 rounded-full bg-orange-500" style={{ width: `${Math.min(100, (event.booked / event.capacity) * 100)}%` }} />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-neutral-500">{event.booked} of {event.capacity} tickets booked</p>
                    <div className="flex gap-2">
                      <button onClick={() => editEvent(event)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-200 px-3 text-xs font-bold">
                        <Edit3 size={14} />
                        Edit
                      </button>
                      <button onClick={() => setAttendeeEventId(attendeeEventId === event.id ? null : event.id)} className="inline-flex h-9 items-center gap-2 rounded-lg bg-neutral-100 px-3 text-xs font-bold">
                        <Users size={14} />
                        Joined
                      </button>
                    </div>
                  </div>
                  {attendeeEventId === event.id && (
                    <div className="mt-4 rounded-lg bg-neutral-50 p-3">
                      <p className="text-sm font-bold">People joined</p>
                      <div className="mt-2 space-y-2">
                        {attendees.length === 0 ? (
                          <p className="text-sm text-neutral-500">No joined users yet.</p>
                        ) : (
                          attendees.map((attendee) => (
                            <div key={attendee.id} className="flex justify-between rounded-lg bg-white px-3 py-2 text-sm">
                              <span className="font-semibold">{attendee.user.fullname}</span>
                              <span className="text-neutral-500">{attendee.user.email}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
