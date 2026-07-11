import { Link, NavLink, useNavigate } from "react-router-dom";
import { MapPin, Search, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Find Events", href: "/events" },
  { label: "Calendar", href: "/event-calendar" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dashboardHref =
    user?.role === "superadmin" ? "/admin" : user?.role === "eventor" ? "/manager" : "/dashboard";

  const submitSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const query = [searchTerm.trim(), location.trim()].filter(Boolean).join(" ");

    if (query) {
      params.set("q", query);
    }

    navigate(params.toString() ? `/events?${params.toString()}` : "/events");
    setOpen(false);
  };

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

        <form onSubmit={submitSearch} className="hidden flex-1 items-center gap-3 md:flex">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4">
            <Search size={18} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search Events"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>

          <div className="flex h-11 min-w-52 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4">
            <MapPin size={18} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Your Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>

          <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-600 text-white transition hover:bg-orange-700">
            <Search size={19} />
          </button>
        </form>

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
          {user ? (
            <>
              <NavLink to={dashboardHref} className="text-sm font-medium text-neutral-700 hover:text-orange-600">
                Dashboard
              </NavLink>
              <button onClick={logout} className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-orange-600">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="text-sm font-medium text-neutral-700 hover:text-orange-600">
                Login
              </NavLink>
              <NavLink to="/signup" className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
                Sign Up
              </NavLink>
            </>
          )}
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
          <form onSubmit={submitSearch} className="space-y-3">
            <div className="flex h-11 items-center gap-2 rounded-full border border-neutral-200 px-4">
              <Search size={18} className="text-neutral-400" />
              <input
                type="text"
                placeholder="Search Events"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>

            <div className="flex h-11 items-center gap-2 rounded-full border border-neutral-200 px-4">
              <MapPin size={18} className="text-neutral-500" />
              <input
                type="text"
                placeholder="Your Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full border-none bg-transparent text-sm outline-none"
              />
            </div>
            <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-orange-600 text-sm font-semibold text-white">
              <Search size={17} />
              Search events
            </button>

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
              {user ? (
                <>
                  <Link
                    to={dashboardHref}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="rounded-xl px-3 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </header>
  );
}
