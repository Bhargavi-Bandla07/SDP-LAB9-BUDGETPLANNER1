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

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Signin failed — check credentials");
        return;
      }

      // backend should return { token: "...", user: { id, name, email } }
      const token = data.token ?? data.accessToken ?? data.jwt;
      const user = data.user ?? data;

      if (!token) {
        console.warn("No token in signin response:", data);
      } else {
        localStorage.setItem("token", token);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }

      // After storing token + user, navigate to protected route
      navigate("/expense");
    } catch (err) {
      console.error("Signin error:", err);
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
