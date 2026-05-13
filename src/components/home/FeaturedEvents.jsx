import Container from "../common/Container";
import EventCard from "./EventCard";

const events = [
  {
    id: 1,
    title: "Kathmandu Live Music Night",
    category: "Music",
    date: "June 18, 2026",
    location: "Kathmandu, Nepal",
    price: "Rs. 999",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Startup & Business Networking Event",
    category: "Business",
    date: "June 22, 2026",
    location: "Lalitpur, Nepal",
    price: "Free",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1600&auto=format&fit=crop'",
  },
  {
    id: 3,
    title: "Food Festival 2026",
    category: "Food",
    date: "July 3, 2026",
    location: "Bhaktapur, Nepal",
    price: "Rs. 499",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedEvents() {
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

          <button className="hidden text-sm font-semibold text-orange-600 hover:text-orange-700 sm:block">
            View all
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>
    </section>
  );
}