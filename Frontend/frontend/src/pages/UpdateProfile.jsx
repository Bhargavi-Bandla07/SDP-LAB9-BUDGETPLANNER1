// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function UpdateProfile({ setUser }) {
//   const navigate = useNavigate();
//   const userJson = localStorage.getItem("user");
//   const user = userJson ? JSON.parse(userJson) : null;

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate("/signin");
//       return;
//     }

//     axios
//       .get(`http://localhost:2005/api/users/${user.id}`)
//       .then((res) => {
//         const data = res.data;
//         setName(data.name ?? "");
//         setEmail(data.email ?? "");
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error fetching profile");
//         navigate("/signin");
//       });
//   }, [user?.id, navigate]);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     if (!user) return;

//     const payload = { name, email };
//     if (password.trim() !== "") payload.password = password;

//     axios
//       .put(`http://localhost:2005/api/users/${user.id}`, payload)
//       .then((res) => {
//         alert("Profile updated successfully!");
//         const updatedUser = { ...user, name, email };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//         if (setUser) setUser(updatedUser); // update navbar immediately
//         navigate("/"); // go back to home/dashboard
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error updating profile");
//       });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto" }}>
//       <h2>Update Profile</h2>
//       <form onSubmit={handleUpdate}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: "10px" }}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: "10px" }}>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter new password or leave blank"
//           />
//         </div>

//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * UpdateProfile.jsx
 * - Uses VITE_API_URL (set before build)
 * - Attaches Authorization header using token stored in localStorage
 * - Updates localStorage user and calls setUser after successful update
 */

export default function UpdateProfile({ setUser }) {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Helper to get API base and token
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:2005";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      // if no user or token, redirect to sign in
      navigate("/signin");
      return;
    }

    // fetch profile with Authorization header
    setLoading(true);
    axios
      .get(`${API_BASE}/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.response || err.message);
        // If unauthorized, clear storage and redirect to signin
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/signin");
          return;
        }
        alert("Error fetching profile. Please sign in again.");
        navigate("/signin");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!user || !token) {
      navigate("/signin");
      return;
    }

    const payload = { name, email };
    if (password.trim() !== "") payload.password = password;

    axios
      .put(`${API_BASE}/api/users/${user.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Profile updated successfully!");
        // Update local user object (do not include password)
        const updatedUser = { ...user, name: res.data.name || name, email: res.data.email || email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); // update parent/navbar
        navigate("/"); // redirect to home
      })
      .catch((err) => {
        console.error("Error updating profile:", err.response || err.message);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          navigate("/signin");
          return;
        }
        alert("Error updating profile. See console for details.");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password or leave blank"
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
