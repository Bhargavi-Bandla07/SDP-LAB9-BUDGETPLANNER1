import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/signin`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // read raw JSON
      const data = await res.json();

      // LOG the backend response so you can inspect it (open DevTools Console)
      console.log("SIGNIN RESPONSE:", data, "HTTP_STATUS:", res.status);

      if (!res.ok) {
        setMsg(data.error || data.message || "Signin failed — check credentials");
        return;
      }

      // Try multiple common shapes for token & user
      const token =
        data.token ||
        data.accessToken ||
        data.jwt ||
        (data.data && (data.data.token || data.data.accessToken || data.data.jwt));

      // user may be returned as data.user or as the whole response
      const user =
        data.user ||
        data.userInfo ||
        data.data ||
        (data.id && { id: data.id, name: data.name, email: data.email }) ||
        data;

      // Save token if present
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.warn("No token found in signin response");
      }

      // Save user if present (stringify)
      if (user && Object.keys(user).length > 0) {
        localStorage.setItem("user", JSON.stringify(user));
        // update app state
        if (typeof setUser === "function") setUser(user);
      } else {
        console.warn("No user object found in signin response");
      }

      // Ensure that we saved either token or user before navigating
      // navigate to protected page
      navigate("/expense");
    } catch (err) {
      console.error("Signin fetch error:", err);
      setMsg("Network error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {msg && <p className="msg">{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
