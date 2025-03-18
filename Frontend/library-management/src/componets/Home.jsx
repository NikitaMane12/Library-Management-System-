import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Welcome to Library Management 📚</h1>
      <p>Your favorite place to find amazing books!</p>
      <button className="button" onClick={handleClick}>
        Explore Books
      </button>
    </div>
  );
};

export default Home;
