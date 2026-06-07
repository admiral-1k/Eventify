import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import AllEvents from "../pages/AllEvents";
import DashboardLayout from "../components/layout/DashboardLayout";


export default function AppRoutes() {
  return (
    <Routes>

  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>

  <Route element={<DashboardLayout />}>
    <Route path="/all-events" element={<AllEvents />} />
  </Route>

  <Route path="*" element={<NotFound />} />

</Routes>
  );
}