import { useState } from "react";

import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://library-management-system-e3hq.onrender.com/users/login",
        {
          email,
          password,
        }
      );

      let result = response.data;
      // console.log("response--->", response);
      if (!result.isError) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));

        navigate("/booklist");
      } else {
        Swal.fire({
          title: "Error!",
          text: result.meassge,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      // alert(error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Login failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="Body-conatainer">
          <div className="Login-container">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
