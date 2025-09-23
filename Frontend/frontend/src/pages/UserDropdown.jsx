import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UserDropdown
 * - If `user` prop is already present, shows it.
 * - If not, tries localStorage "user".
 * - If no local user but localStorage has "token", fetch the profile from backend.
 * - On logout removes both "user" and "token".
 *
 * NOTE: Make sure your frontend's .env has:
 *   VITE_API_URL=http://localhost:2005
 * and you rebuild the frontend after changing .env.
 */
export default function UserDropdown({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // On mount: try to populate user from localStorage or by calling profile endpoint
  useEffect(() => {
    async function bootstrapUser() {
      // if parent already provided user, do nothing
      if (user) return;

      // 1) Try localStorage "user"
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          return;
        } catch (e) {
          console.warn("Could not parse stored user", e);
        }
      }

      // 2) If token present, try fetching profile from backend
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true);
        try {
          const apiBase = import.meta.env.VITE_API_URL || "";
          const res = await fetch(`${apiBase}/api/auth/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            // token invalid or profile endpoint not reachable
            console.warn("Profile fetch failed", res.status);
            // optionally remove token if unauthorized
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("token");
            }
            setLoading(false);
            return;
          }

          const profile = await res.json();
          setUser(profile);
          try {
            localStorage.setItem("user", JSON.stringify(profile));
          } catch (e) {
            // ignore storage errors
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        } finally {
          setLoading(false);
        }
      }
    }

    bootstrapUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // update parent state so navbar updates
    navigate("/signin");
  };

  // UI
  const displayName = user?.name || user?.email || "User";

  return (
    <div ref={dropdownRef} className="user-dropdown">
      <span
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {loading ? "Loading..." : `Hi, ${displayName} ▼`}
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
