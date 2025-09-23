// src/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  if (!user) {
    // not signed in -> redirect to signin
    return <Navigate to="/signin" replace />;
  }
  return children; // render protected page
}
