import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProfile({ setUser }) {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:2005";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      navigate("/signin");
      return;
    }

    setLoading(true);
    axios.get(`${API_BASE}/api/users/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/signin");
      })
      .finally(() => setLoading(false));
  }, [user?.id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!user || !token) {
      navigate("/signin");
      return;
    }

    const payload = { name, email };
    if (password.trim() !== "") payload.password = password;

    axios.put(`${API_BASE}/api/users/${user.id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const updatedUser = { ...user, name: res.data.name || name, email: res.data.email || email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Profile updated!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Failed to update profile");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password or leave blank" />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
