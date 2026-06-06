import { Link, NavLink } from "react-router-dom";
import { MapPin, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/images/logo.png";

const navItems = [
  { label: "Find Events", href: "/events" },
  { label: "Create Events", href: "/create-event" },
  { label: "Find my tickets", href: "/my-tickets" },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="Eventify"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <div className="hidden flex-1 items-center gap-3 md:flex">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4">
            <Search size={18} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search Events"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>

          <div className="flex h-11 min-w-52 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4">
            <MapPin size={18} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Your Location"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-600 text-white transition hover:bg-orange-700">
            <Search size={19} />
          </button>
        </div>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-orange-600"
                    : "text-neutral-700 hover:text-orange-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 lg:hidden">
          <div className="space-y-3">
            <div className="flex h-11 items-center gap-2 rounded-full border border-neutral-200 px-4">
              <Search size={18} className="text-neutral-400" />
              <input
                type="text"
                placeholder="Search Events"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex h-11 items-center gap-2 rounded-full border border-neutral-200 px-4">
              <MapPin size={18} className="text-neutral-500" />
              <input
                type="text"
                placeholder="Your Location"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}