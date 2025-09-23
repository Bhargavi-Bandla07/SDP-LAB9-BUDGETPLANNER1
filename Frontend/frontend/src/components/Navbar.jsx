import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import UserDropdown from "../pages/UserDropdown.jsx";

export default function Navbar({ user, setUser }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/expense" className="nav-item">Expenses</Link>
        <Link to="/alerts" className="nav-item">Alerts</Link>
        <Link to="/income" className="nav-item">Income</Link>
        <Link to="/savings" className="nav-item">Savings</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <UserDropdown user={user} setUser={setUser} />
        ) : (
          <>
            <Link to="/signin" className="nav-item">Sign In</Link>
            <Link to="/signup" className="nav-item">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
