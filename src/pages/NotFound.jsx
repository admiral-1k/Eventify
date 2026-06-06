import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";

import animationData from "../assets/animation/no_data_found.json";

export default function NotFound() {
  const animationRef = useRef(null);

  useEffect(() => {
    if (!animationRef.current) return;

    const animation = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <section className="min-h-[70vh] bg-white px-4 py-16 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center">
        <div ref={animationRef} className="h-64 w-64 sm:h-80 sm:w-80" />

        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}