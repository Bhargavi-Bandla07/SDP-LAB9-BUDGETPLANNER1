import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Alerts from "./pages/Alerts";
import Income from "./pages/Income";
import Savings from "./pages/Savings";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./pages/UpdateProfile";
import "./App.css";

export default function App() {
  // <-- LIFT USER STATE HERE
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) setUser(JSON.parse(userJson));
  }, []);

  return (
    <BrowserRouter>
      <div>
        <header className="app-header"><h1>BUDGET PLANNER</h1></header>
        <Navbar user={user} setUser={setUser} />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Protected routes - only accessible after signin */}
            <Route path="/expense" element={
              <PrivateRoute><Expense /></PrivateRoute>
            } />
            <Route path="/income" element={
              <PrivateRoute><Income /></PrivateRoute>
            } />
            <Route path="/savings" element={
              <PrivateRoute><Savings /></PrivateRoute>
            } />
            <Route path="/alerts" element={
              <PrivateRoute><Alerts /></PrivateRoute>
            } />

            {/* Update profile route */}
            <Route path="/update-profile" element={<UpdateProfile setUser={setUser} />} />

            {/* Auth pages */}
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/signin" element={<Signin setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
