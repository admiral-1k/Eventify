import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  PlusCircle,
  ShieldCheck,
  Tag,
  Ticket,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { roleLabels } from "../../data/eventStore";
import logo from "../../assets/images/logo.png";

const linksByRole = {
  user: [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Browse Events", href: "/events", icon: CalendarDays },
  { label: "My Calendar", href: "/my-calendar", icon: CalendarDays },
  { label: "Bookings", href: "/my-bookings", icon: Ticket },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Create Ticket", href: "/create-ticket", icon: PlusCircle },
  { label: "Support", href: "/support", icon: LifeBuoy },
],
  eventor: [
    { label: "Manager", href: "/manager", icon: LayoutDashboard },
    { label: "Create Event", href: "/manager/create-event", icon: PlusCircle },
    { label: "Support", href: "/support", icon: LifeBuoy },
  ],
  superadmin: [
    { label: "Admin", href: "/admin", icon: ShieldCheck },
    { label: "All Events", href: "/admin/events", icon: CalendarDays },
    { label: "Categories", href: "/admin/categories", icon: Tag },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Tickets", href: "/admin/tickets", icon: LifeBuoy },
  ],
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = linksByRole[user?.role] || linksByRole.user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-200 bg-white px-4 py-5 lg:block">
        <img src={logo} alt="Eventify" className="h-10 w-auto" />

        <div className="mt-8 rounded-lg bg-neutral-50 p-4">
          <p className="text-sm font-semibold">{user?.fullname || "Eventify User"}</p>
          <p className="mt-1 text-xs text-neutral-500">{roleLabels[user?.role] || "User"}</p>
        </div>

        <nav className="mt-6 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end
                className={({ isActive }) =>
                  `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-5 left-4 right-4 flex h-11 items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Eventify" className="h-9 w-auto" />
            <button onClick={handleLogout} className="rounded-lg border border-neutral-200 p-2">
              <LogOut size={18} />
            </button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {links.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                    isActive ? "bg-orange-600 text-white" : "bg-neutral-100 text-neutral-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
