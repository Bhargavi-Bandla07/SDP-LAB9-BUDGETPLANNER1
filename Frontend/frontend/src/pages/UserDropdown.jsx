// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UserDropdown({ user, setUser }) {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/signin");
//   };

//   return (
//     <div ref={dropdownRef} className="user-dropdown">
//       <span onClick={() => setOpen(!open)}>Hi, {user?.name || "User"} ▼</span>
//       {open && (
//         <div className="dropdown-menu">
//           <button onClick={() => navigate("/update-profile")}>Update Profile</button>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
    setUser(null); // updates Navbar immediately
    navigate("/signin");
  };

  return (
    <div ref={dropdownRef} className="user-dropdown">
      <span onClick={() => setOpen(!open)}>Hi, {user?.name || "User"} ▼</span>
      {open && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/update-profile")}>Update Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
