// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../App.css";
// import UserDropdown from "../pages/UserDropdown.jsx";

// export default function Navbar() {
//   const [user, setUser] = useState(null);

//   // Sync user state with localStorage
//   useEffect(() => {
//     const userJson = localStorage.getItem("user");
//     if (userJson) setUser(JSON.parse(userJson));
//   }, []);

//   // Optional: listen for storage changes (useful if multiple tabs)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const userJson = localStorage.getItem("user");
//       setUser(userJson ? JSON.parse(userJson) : null);
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <Link to="/" className="nav-item">Home</Link>
//         <Link to="/expense" className="nav-item">Expenses</Link>
//         <Link to="/alerts" className="nav-item">Alerts</Link>
//         <Link to="/income" className="nav-item">Income</Link>
//         <Link to="/savings" className="nav-item">Savings</Link>
//       </div>

//       <div className="nav-right">
//         {user ? (
//           <UserDropdown user={user} setUser={setUser} />
//         ) : (
//           <>
//             <Link to="/signin" className="nav-item">Sign In</Link>
//             <Link to="/signup" className="nav-item">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import UserDropdown from "../pages/UserDropdown.jsx";

export default function Navbar() {
  const [user, setUser] = useState(null);

  // Load user on mount
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) setUser(JSON.parse(userJson));
  }, []);

  // Sync user if localStorage changes (multiple tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const userJson = localStorage.getItem("user");
      setUser(userJson ? JSON.parse(userJson) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
