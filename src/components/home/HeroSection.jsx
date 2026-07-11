import Container from "../common/Container";
import heroBg from "../../assets/images/hero-bg.png";

export default function HeroSection() {
  return (
    <section className="py-5">
      <Container>
        <div
          className="relative min-h-[340px] overflow-hidden rounded-3xl bg-neutral-950 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.25),transparent_35%)]" />
        </div>
      </Container>
    </section>
  );
}
