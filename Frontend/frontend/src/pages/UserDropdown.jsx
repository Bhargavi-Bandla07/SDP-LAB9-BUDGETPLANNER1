import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Click-outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  };

  const displayName = user?.name || user?.email || "User";

  return (
    <div ref={dropdownRef} className="user-dropdown">
      <span
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        Hi, {displayName} ▼
      </span>

      {open && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/update-profile")}>
            Update Profile
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
