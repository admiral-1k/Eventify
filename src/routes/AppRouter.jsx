import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AllEvents from "../pages/AllEvents";
import EventDetail from "../pages/EventDetail";
import EventCalendar from "../pages/EventCalendar";
import NotFound from "../pages/NotFound";
import UserDashboard from "../pages/UserDashboard";
import MyBookings from "../pages/MyBookings";
import SupportTickets from "../pages/SupportTickets";
import ManagerDashboard from "../pages/ManagerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import CreateTicket from "../pages/CreateTicket";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/all-events" element={<Navigate to="/events" replace />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/support" element={<SupportTickets />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/my-calendar" element={<EventCalendar bookedOnly />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/favorites" element={<MyBookings mode="favorites" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["eventor"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/create-event" element={<ManagerDashboard createOnly />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<AdminDashboard view="events" />} />
          <Route path="/admin/categories" element={<AdminDashboard view="categories" />} />
          <Route path="/admin/users" element={<AdminDashboard view="users" />} />
          <Route path="/admin/tickets" element={<AdminDashboard view="tickets" />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
