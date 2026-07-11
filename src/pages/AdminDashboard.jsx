import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck, Edit3, LifeBuoy, Plus, Search, ShieldCheck, Tag, Users } from "lucide-react";
import countries from "../data/countries.json";
import { eventStore, formatEventDate, formatPrice, getEventAttendees, roleLabels } from "../data/eventStore";
import SupportTickets from "./SupportTickets";
import DashboardStat from "../components/common/DashboardStat";

const statusClass = {
  approved: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-rose-50 text-rose-700",
};

export default function AdminDashboard({ view = "overview" }) {
  const [events, setEvents] = useState(eventStore.getEvents());
  const [users, setUsers] = useState(eventStore.getUsers());
  const [categories, setCategories] = useState(eventStore.getCategories());
  const [query, setQuery] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [attendeeEventId, setAttendeeEventId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const tickets = eventStore.getTickets();

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        `${event.title} ${event.category} ${event.country} ${event.location} ${event.manager} ${event.status}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [events, query]
  );

  const filteredUsers = users.filter((user) =>
    `${user.fullname} ${user.email} ${user.role} ${user.companyName || ""} ${user.accountStatus || ""}`.toLowerCase().includes(query.toLowerCase())
  );

  const setEventStatus = (id, status) => {
    const nextEvents = events.map((event) => (event.id === id ? { ...event, status } : event));
    eventStore.saveEvents(nextEvents);
    setEvents(nextEvents);
    toast.success(`Event ${status}.`);
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setEditForm({
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
    });
  };

  const updateEditForm = (name, value) => {
    if (name === "country") {
      const selectedCountry = countries.find((country) => country.name === value);
      setEditForm({ ...editForm, country: value, location: selectedCountry?.cities[0] || "" });
      return;
    }
    setEditForm({ ...editForm, [name]: value });
  };

  const saveEventEdit = () => {
    const nextEvents = events.map((event) =>
      event.id === editingId
        ? { ...event, ...editForm, price: Number(editForm.price), capacity: Number(editForm.capacity) }
        : event
    );
    eventStore.saveEvents(nextEvents);
    setEvents(nextEvents);
    setEditingId(null);
    setEditForm(null);
    toast.success("Event updated.");
  };

  const addCategory = (event) => {
    event.preventDefault();
    const value = newCategory.trim();
    if (!value || categories.some((category) => category.toLowerCase() === value.toLowerCase())) {
      toast.error("Enter a unique category.");
      return;
    }
    const nextCategories = [...categories, value];
    eventStore.saveCategories(nextCategories);
    setCategories(nextCategories);
    setNewCategory("");
    toast.success("Category added.");
  };

  const setUserStatus = (id, accountStatus) => {
    const nextUsers = users.map((user) => (user.id === id ? { ...user, accountStatus } : user));
    eventStore.saveUsers(nextUsers);
    setUsers(nextUsers);

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (currentUser?.id === id) {
      const updatedCurrentUser = nextUsers.find((user) => user.id === id);
      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));
    }

    toast.success(`Account ${accountStatus}.`);
  };

  if (view === "tickets") {
    return <SupportTickets />;
  }

  if (view === "users") {
    return (
      <section className="mx-auto max-w-7xl rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold">User section</h1>
          <SearchBox value={query} onChange={setQuery} placeholder="Search users" />
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Company</th>
                <th>Verification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-neutral-100">
                  <td className="py-4 font-semibold">{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{roleLabels[user.role]}</td>
                  <td>{user.companyName || "-"}</td>
                  <td>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      (user.accountStatus || "approved") === "approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : (user.accountStatus || "approved") === "rejected"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                    }`}>
                      {user.accountStatus || "approved"}
                    </span>
                  </td>
                  <td>
                    {user.role === "eventor" ? (
                      <div className="flex gap-2">
                        <button onClick={() => setUserStatus(user.id, "approved")} className="h-9 rounded-lg bg-emerald-600 px-3 text-xs font-bold text-white">
                          Approve
                        </button>
                        <button onClick={() => setUserStatus(user.id, "rejected")} className="h-9 rounded-lg border border-neutral-200 px-3 text-xs font-bold">
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-neutral-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (view === "categories") {
    return (
      <section className="mx-auto max-w-5xl">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase text-orange-600">Admin</p>
          <h1 className="mt-1 text-2xl font-bold">Category management</h1>
          <form onSubmit={addCategory} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Add category" className="h-11 flex-1 rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500" />
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 text-sm font-semibold text-white">
              <Plus size={18} />
              Add Category
            </button>
          </form>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
              <Tag size={18} className="text-orange-600" />
              <span className="font-semibold">{category}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl">
      <div className="rounded-lg bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-orange-600">Super Admin</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Admin section</h1>
        <p className="mt-2 text-sm text-neutral-500">Approve, edit, and search every event, category, user, and support ticket.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {[
          { label: "Events", value: events.length, icon: CalendarCheck },
          { label: "Pending", value: events.filter((event) => event.status === "pending").length, icon: ShieldCheck },
          { label: "Users", value: users.length, icon: Users },
          { label: "Pending Managers", value: users.filter((user) => user.role === "eventor" && user.accountStatus === "pending").length, icon: ShieldCheck },
          { label: "Categories", value: categories.length, icon: Tag },
          { label: "Tickets", value: tickets.length, icon: LifeBuoy },
        ].map((item) => {
          return (
            <DashboardStat key={item.label} icon={item.icon} label={item.label} value={item.value} />
          );
        })}
      </div>

      <div className="mt-6 rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-lg font-bold">All events</h2>
          <SearchBox value={query} onChange={setQuery} placeholder="Search events" />
        </div>
        <div className="mt-4 space-y-3">
          {filteredEvents.map((event) => {
            const selectedCountry = countries.find((country) => country.name === editForm?.country) || countries[0];
            const attendees = attendeeEventId === event.id ? getEventAttendees(event.id) : [];
            return (
              <article key={event.id} className="rounded-lg border border-neutral-200 p-4">
                {editingId === event.id ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <AdminInput label="Title" value={editForm.title} onChange={(value) => updateEditForm("title", value)} />
                    <label className="text-sm font-semibold text-neutral-700">
                      Category
                      <select value={editForm.category} onChange={(item) => updateEditForm("category", item.target.value)} className="mt-2 h-10 w-full rounded-lg border border-neutral-200 px-3">
                        {categories.map((category) => <option key={category}>{category}</option>)}
                      </select>
                    </label>
                    <label className="text-sm font-semibold text-neutral-700">
                      Country
                      <select value={editForm.country} onChange={(item) => updateEditForm("country", item.target.value)} className="mt-2 h-10 w-full rounded-lg border border-neutral-200 px-3">
                        {countries.map((country) => <option key={country.name}>{country.name}</option>)}
                      </select>
                    </label>
                    <label className="text-sm font-semibold text-neutral-700">
                      Location
                      <select value={editForm.location} onChange={(item) => updateEditForm("location", item.target.value)} className="mt-2 h-10 w-full rounded-lg border border-neutral-200 px-3">
                        {selectedCountry.cities.map((city) => <option key={city}>{city}</option>)}
                      </select>
                    </label>
                    <AdminInput label="Date" type="date" value={editForm.date} onChange={(value) => updateEditForm("date", value)} />
                    <AdminInput label="Time" type="time" value={editForm.time} onChange={(value) => updateEditForm("time", value)} />
                    <AdminInput label="Venue" value={editForm.venue} onChange={(value) => updateEditForm("venue", value)} />
                    <AdminInput label="Price" type="number" value={editForm.price} onChange={(value) => updateEditForm("price", value)} />
                    <AdminInput label="Capacity" type="number" value={editForm.capacity} onChange={(value) => updateEditForm("capacity", value)} />
                    <div className="flex items-end gap-2">
                      <button onClick={saveEventEdit} className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white">Save</button>
                      <button onClick={() => { setEditingId(null); setEditForm(null); }} className="h-10 rounded-lg border border-neutral-200 px-4 text-sm font-semibold">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold">{event.title}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[event.status] || statusClass.pending}`}>
                            {event.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-neutral-500">
                          {event.manager} | {event.category} | {event.country}, {event.location} | {formatEventDate(event.date)} | {formatPrice(event.price)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setEventStatus(event.id, "approved")} className="h-10 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white">Approve</button>
                        <button onClick={() => setEventStatus(event.id, "rejected")} className="h-10 rounded-lg border border-neutral-200 px-4 text-sm font-semibold">Reject</button>
                        <button onClick={() => startEdit(event)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-semibold">
                          <Edit3 size={15} />
                          Edit
                        </button>
                        <button onClick={() => setAttendeeEventId(attendeeEventId === event.id ? null : event.id)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-100 px-4 text-sm font-semibold">
                          <Users size={15} />
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
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-lg border border-neutral-200 px-3">
      <Search size={17} className="text-neutral-400" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full border-none bg-transparent text-sm outline-none" />
    </div>
  );
}

function AdminInput({ label, value, onChange, type = "text" }) {
  return (
    <label className="text-sm font-semibold text-neutral-700">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500" />
    </label>
  );
}
