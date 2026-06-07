import EventCard from "../components/home/EventCard";

import bandPoster from "../assets/images/bandPoster.jpeg";
import newariFood from "../assets/images/newariFood.png";
import sport from "../assets/images/sport.png";

const events = [
  {
    id: 1,
    title: "Band Concert Night",
    category: "Music",
    date: "June 20, 2026",
    location: "Kathmandu",
    price: "Rs. 500",
    image: bandPoster,
    buttonText: "Book Ticket",
  },

  {
    id: 2,
    title: "Newari Food Festival",
    category: "Food",
    date: "July 15, 2026",
    location: "Bhaktapur",
    price: "Entry Free",
    image: newariFood,
    buttonText: "Free Entry",
  },

  {
    id: 3,
    title: "Sports Championship",
    category: "Sports",
    date: "August 10, 2026",
    location: "Kathmandu",
    price: "Rs. 300",
    image: sport,
    buttonText: "Book Ticket",
  },
];

export default function AllEvents() {
  return (
    <>
      <section className="bg-[#4b3567] h-[250px] flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white">
          All Events
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">
          Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>
    </>
  );
}