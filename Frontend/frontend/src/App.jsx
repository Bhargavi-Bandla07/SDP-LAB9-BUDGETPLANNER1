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
  // single source of truth for user
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

            {/* Protected routes */}
            <Route path="/expense" element={
              <PrivateRoute user={user}>
                <Expense />
              </PrivateRoute>
            } />
            <Route path="/income" element={
              <PrivateRoute user={user}>
                <Income />
              </PrivateRoute>
            } />
            <Route path="/savings" element={
              <PrivateRoute user={user}>
                <Savings />
              </PrivateRoute>
            } />
            <Route path="/alerts" element={
              <PrivateRoute user={user}>
                <Alerts />
              </PrivateRoute>
            } />

            {/* Update profile route */}
            <Route path="/update-profile" element={<UpdateProfile setUser={setUser} />} />

            {/* Auth pages — pass setUser so signin/signup can update the app */}
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/signin" element={<Signin setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
