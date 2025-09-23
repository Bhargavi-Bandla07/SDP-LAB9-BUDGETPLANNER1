import React from "react";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute
 * - Accepts optional user prop (from App state).
 * - Falls back to localStorage if user prop is not yet populated.
 */
export default function PrivateRoute({ user, children }) {
  const currentUser = user || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
