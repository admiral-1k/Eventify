import { useState } from "react";

export default function CreateTicket() {
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Ticket Submitted!");

    setSubject("");
    setPriority("Medium");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Create Support Ticket</h1>

      <p className="mt-2 text-gray-500">
        Tell us your problem and we'll help you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl bg-white p-6 shadow"
      >
        <div>
          <label className="block font-semibold mb-2">
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Enter ticket subject"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Describe your problem
          </label>

          <textarea
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border p-3"
            placeholder="Write your issue here..."
            required
          />
        </div>

        <button
          className="rounded-lg bg-orange-600 px-6 py-3 text-white font-semibold hover:bg-orange-700"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}