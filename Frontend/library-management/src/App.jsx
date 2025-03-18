import React from "react";
import Navbar from "./componets/Navbar";
import Home from "./componets/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Login from "./componets/login";

import BookList from "./componets/BookList";
import Register from "./componets/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booklist" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
