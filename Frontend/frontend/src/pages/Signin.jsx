// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// export default function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   // ✅ Use backend URL from .env
//   const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/signin`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setMsg(data.error || "Signin failed — did you sign up?");
//         return;
//       }
//       // Successful signin: save user and go to protected page
//       localStorage.setItem("user", JSON.stringify(data));
//       navigate("/expense"); // redirect after signin
//     } catch (err) {
//       setMsg("Network error");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign In</h2>
//       {msg && <p className="msg">{msg}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           type="email"
//           required
//         />
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           type="password"
//           required
//         />
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Signin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Use backend URL from .env
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
        setMsg(data.error || "Signin failed — did you sign up?");
        return;
      }

      // ✅ Save both token and user
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user); // update navbar immediately
      }

      navigate("/expense"); // redirect after signin
    } catch (err) {
      console.error(err);
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
