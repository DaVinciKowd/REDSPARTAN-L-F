import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SubmitItem from "./pages/SubmitItem";
import ClaimItem from "./pages/ClaimItem";
import SearchPage from "./pages/SearchPage";
import Chatbot from "./components/Chatbot";
import AboutUs from "./pages/AboutUs";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function ProtectedLayout() {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitItem />} />
            <Route path="/claim-item/:id" element={<ClaimItem />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Route>
        </Route>

        {/* Error Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
