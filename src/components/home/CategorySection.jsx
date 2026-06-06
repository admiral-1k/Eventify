import Container from "../common/Container";
import { categories } from "../../data/categorries";

export default function CategorySection() {
  return (
    <section className="py-5">
      <Container>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className="group flex flex-col items-center gap-2 rounded-2xl p-2 transition hover:bg-neutral-50"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200 bg-white transition group-hover:border-orange-500 group-hover:text-orange-600">
                  <Icon size={28} strokeWidth={1.6} />
                </span>

                <span className="text-center text-xs font-medium text-neutral-700">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}