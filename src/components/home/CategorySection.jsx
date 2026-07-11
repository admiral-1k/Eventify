import { Link } from "react-router-dom";
import { Briefcase, Drama, Dumbbell, Music, Palette, Utensils } from "lucide-react";
import Container from "../common/Container";
import { eventStore } from "../../data/eventStore";

const iconMap = {
  Music,
  Food: Utensils,
  Sports: Dumbbell,
  Art: Palette,
  Culture: Drama,
  Business: Briefcase,
};

export default function CategorySection() {
  const categories = eventStore.getCategories();

  return (
    <section className="py-5">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {categories.map((category) => {
            const Icon = iconMap[category] || Briefcase;

            return (
              <Link
                key={category}
                to={`/events?category=${encodeURIComponent(category)}`}
                className="group flex flex-col items-center gap-2 rounded-2xl p-2 transition hover:bg-neutral-50"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200 bg-white transition group-hover:border-orange-500 group-hover:text-orange-600">
                  <Icon size={28} strokeWidth={1.6} />
                </span>

                <span className="text-center text-xs font-medium text-neutral-700">
                  {category}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
