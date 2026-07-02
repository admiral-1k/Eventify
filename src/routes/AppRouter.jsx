import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AllEvents from "../pages/AllEvents";
import EventCalendar from "../pages/EventCalendar";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/event-calendar" element={<EventCalendar />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/all-events" element={<AllEvents />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}