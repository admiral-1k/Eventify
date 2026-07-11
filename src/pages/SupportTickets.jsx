import { useState } from "react";
import toast from "react-hot-toast";
import { Send, X } from "lucide-react";
import { eventStore } from "../data/eventStore";
import { useAuth } from "../context/AuthContext";

const columns = [
  { key: "Pending", color: "bg-[#7a5d00]", title: "text-[#7a5d00]" },
  { key: "In Progress", color: "bg-red-600", title: "text-red-600" },
  { key: "Feedback Requested", color: "bg-blue-700", title: "text-blue-700" },
  { key: "Completed", color: "bg-green-700", title: "text-green-700" },
];

const legacyStatus = {
  Open: "Pending",
  "In Review": "In Progress",
  Resolved: "Completed",
};

const priorityClass = {
  Low: "bg-neutral-100 text-neutral-700",
  Medium: "bg-blue-50 text-blue-700",
  High: "bg-amber-50 text-amber-700",
  Urgent: "bg-rose-50 text-rose-700",
};

const normalizeTicket = (ticket) => ({
  ...ticket,
  status: legacyStatus[ticket.status] || ticket.status || "Pending",
  replies: Array.isArray(ticket.replies) ? ticket.replies : [],
});

export default function SupportTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState(eventStore.getTickets().map(normalizeTicket));
  const [showForm, setShowForm] = useState(false);
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [form, setForm] = useState({
    subject: "",
    eventTitle: "",
    priority: "Medium",
    message: "",
  });
  const isAdmin = user?.role === "superadmin";

  const myTickets = isAdmin ? tickets : tickets.filter((ticket) => !ticket.userId || ticket.userId === user?.id);

  const saveTickets = (nextTickets) => {
    eventStore.saveTickets(nextTickets);
    setTickets(nextTickets);
  };

  const submitTicket = (event) => {
    event.preventDefault();
    const nextTickets = [
      {
        id: Date.now(),
        ...form,
        userId: user?.id,
        customer: user?.fullname || "Guest user",
        status: "Pending",
        replies: [],
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...tickets,
    ];

    saveTickets(nextTickets);
    setForm({ subject: "", eventTitle: "", priority: "Medium", message: "" });
    setShowForm(false);
    toast.success("Support ticket created.");
  };

  const updateStatus = (id, status) => {
    const nextTickets = tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket));
    saveTickets(nextTickets);
    toast.success(`Ticket moved to ${status}.`);
  };

  const dropTicket = (status) => {
    if (!isAdmin || !draggedTicket) return;
    updateStatus(draggedTicket, status);
    setDraggedTicket(null);
  };

  const addReply = (ticketId) => {
    const message = replyDrafts[ticketId]?.trim();

    if (!message) {
      toast.error("Write a reply first.");
      return;
    }

    const nextTickets = tickets.map((ticket) =>
      ticket.id === ticketId
        ? {
            ...ticket,
            replies: [
              ...(ticket.replies || []),
              {
                id: Date.now(),
                author: user?.fullname || "Admin",
                role: user?.role || "user",
                message,
                createdAt: new Date().toISOString().slice(0, 10),
              },
            ],
          }
        : ticket
    );

    saveTickets(nextTickets);
    setReplyDrafts({ ...replyDrafts, [ticketId]: "" });
    toast.success("Reply added.");
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-blue-600 pb-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-orange-600">Support</p>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Kanban</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {isAdmin ? "Drag tickets between stages and reply to users." : "Create and track your event support tickets."}
          </p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          Add Ticket
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <form onSubmit={submitTicket} className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
              <div>
                <p className="text-sm font-semibold uppercase text-orange-600">Add ticket</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">Create support ticket</h2>
                <p className="mt-1 text-sm text-neutral-500">Share the event issue and priority so the admin team can respond.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                aria-label="Close add ticket"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid max-h-[65vh] gap-4 overflow-y-auto p-5 lg:grid-cols-4">
              <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} required placeholder="Subject" className="h-11 rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500 lg:col-span-2" />
              <input value={form.eventTitle} onChange={(event) => setForm({ ...form, eventTitle: event.target.value })} placeholder="Related event" className="h-11 rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500" />
              <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="h-11 rounded-lg border border-neutral-200 px-3 text-sm outline-none focus:border-orange-500">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
              <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required placeholder="Message" rows={5} className="resize-none rounded-lg border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-orange-500 lg:col-span-4" />
            </div>
            <div className="flex justify-end gap-3 border-t border-neutral-200 p-5">
              <button type="button" onClick={() => setShowForm(false)} className="h-11 rounded-lg border border-neutral-200 px-5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
                Cancel
              </button>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 text-sm font-semibold text-white hover:bg-orange-700">
                <Send size={18} />
                Submit ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-4">
        {columns.map((column) => {
          const columnTickets = myTickets.filter((ticket) => normalizeTicket(ticket).status === column.key);
          return (
            <div
              key={column.key}
              onDragOver={(event) => {
                if (isAdmin) event.preventDefault();
              }}
              onDrop={() => dropTicket(column.key)}
              className="min-h-[640px] bg-white"
            >
              <h2 className={`mb-6 text-center text-2xl font-semibold ${column.title}`}>{column.key}</h2>
              <div className={`mb-5 flex h-11 items-center justify-center gap-2 text-sm font-semibold text-white ${column.color}`}>
                {column.key}: {columnTickets.length}
              </div>
              <div className="max-h-[560px] space-y-4 overflow-y-auto bg-neutral-50 px-1 py-1">
                {columnTickets.map((ticket) => (
                  <article
                    key={ticket.id}
                    draggable={isAdmin}
                    onDragStart={() => setDraggedTicket(ticket.id)}
                    className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold leading-6 text-blue-600">{ticket.subject}</h3>
                        <p className="mt-2 text-xs text-neutral-500">Customer: {ticket.customer || "Unknown"}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${priorityClass[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-semibold text-neutral-500">Event</p>
                    <p className="text-sm text-neutral-700">{ticket.eventTitle || "General support"}</p>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{ticket.message}</p>
                    <p className="mt-3 text-xs font-semibold text-neutral-400">Created: {ticket.createdAt}</p>

                    {ticket.replies?.length > 0 && (
                      <div className="mt-4 space-y-2 border-t border-neutral-100 pt-3">
                        {ticket.replies.map((reply) => (
                          <div key={reply.id} className="rounded-md bg-neutral-50 p-3">
                            <div className="flex justify-between gap-2 text-xs font-semibold text-neutral-500">
                              <span>{reply.author}</span>
                              <span>{reply.createdAt}</span>
                            </div>
                            <p className="mt-1 text-sm leading-5 text-neutral-700">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {isAdmin && (
                      <div className="mt-4 border-t border-neutral-100 pt-3">
                        <select value={ticket.status} onChange={(event) => updateStatus(ticket.id, event.target.value)} className="h-9 w-full rounded-lg border border-neutral-200 px-3 text-xs font-semibold">
                          {columns.map((item) => <option key={item.key}>{item.key}</option>)}
                        </select>
                        <textarea
                          value={replyDrafts[ticket.id] || ""}
                          onChange={(event) => setReplyDrafts({ ...replyDrafts, [ticket.id]: event.target.value })}
                          placeholder="Reply to user"
                          rows={3}
                          className="mt-3 w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-orange-500"
                        />
                        <button onClick={() => addReply(ticket.id)} className="mt-2 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-3 text-xs font-semibold text-white">
                          <Send size={14} />
                          Reply
                        </button>
                      </div>
                    )}
                  </article>
                ))}
                {columnTickets.length === 0 && (
                  <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-5 text-center text-sm text-neutral-400">
                    Drop tickets here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
