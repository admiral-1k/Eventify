import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import EventCalendar from "../pages/EventCalendar";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/event-calendar" element={<EventCalendar />} />

   
      </Route>
           {/* 404 page should be inside MainLayout */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}