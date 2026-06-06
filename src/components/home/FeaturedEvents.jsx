import Container from "../common/Container";
import EventCard from "./EventCard";
import bandPoster from "../../assets/images/bandPoster.jpeg";
import sport from "../../assets/images/sport.png";
import newariFood from "../../assets/images/newariFood.png";

const events = [
  {
    id: 1,
    title: "Biken and The Merz Live at XO Club",
    category: "Music",
    date: "May 14, 2026",
    location: "Kathmandu, Nepal",
    price: "Rs. 999",
    image: bandPoster,
  },
  {
    id: 2,
    title: "Nepal vs Bangladesh",
    category: "Sports",
    date: "June 3, 2026",
    location: "Nehru Stadium",
    price: "Rs. 999",
    image: sport,
  },
  {
    id: 3,
    title: "Food Festival 2026",
    category: "Food",
    date: "July 3, 2026",
    location: "Bhaktapur, Nepal",
    price: "Entry Free",
    image: newariFood,
    buttonText: "Free Entry",
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