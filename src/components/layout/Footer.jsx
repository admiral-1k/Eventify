import { Link } from "react-router-dom";
import logoWhite from "../../assets/images/logo-white.png";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Find Events", href: "/events" },
  { label: "Create Events", href: "/create-event" },
  { label: "Find my tickets", href: "/my-tickets" },
];

export default function Footer() {
  return (
    <footer className="mt-14 bg-[#46375f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <img
              src={logoWhite}
              alt="Eventify"
              className="h-20 w-auto object-contain sm:h-24"
            />
          </Link>

          <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 sm:gap-x-14">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-xs font-medium text-white/85 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1 px-4 py-4 text-center text-xs text-white/85 sm:px-6 lg:px-8">
          <span>© 2026 eventify. All rights reserved.</span>
          <span className="hidden sm:inline">|</span>

          <Link to="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>

          <span>|</span>

          <Link to="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}