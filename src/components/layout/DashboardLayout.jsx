import { Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function DashboardLayout() {
  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <img
  src={logo}
  alt="Eventify Logo"
  className="h-12 w-auto"
/>

          <div className="flex gap-8">
            <button>Find Events</button>
            <button>Dashboard</button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
