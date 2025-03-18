import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Library Management 📚</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* Authentication Options */}
        <ul className="navbar-nav">
          {user ? (
            <>
              {/* User Profile */}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="fa fa-user"></i>
                  <span>{user.firstname}</span>
                </Link>
              </li>

              {/* Logout Button */}
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out"></i>
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Register */}
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <i className="fa fa-user-plus"></i>
                  <span>Register</span>
                </Link>
              </li>

              {/* Login */}
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <i className="fa fa-sign-in"></i>
                  <span>Login</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
