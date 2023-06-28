import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const Register = () => {
  const URL = "https://coslike-backend.onrender.com";
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity(`Password doesn't match`);
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      console.log("user:", user);
      axios
        .post(`${URL}/api/v1/auth/register`, user)
        .then((response) => {
          if (response.status === 200) {
            alert("registration successful");
            navigate("/login");
          } else {
            alert("Username already taken");
          }
        })
        .catch((error) => {
          console.log("registration unsuccessful with error:", error);
        });
    }
  };

  return (
    <div className="body">
      <div className="register-container">
        <div className="card">
          <div className="form">
            <h1>COSLIKE</h1>
            <h2>Sign up</h2>
            <form>
              <input
                type="text"
                required
                ref={username}
                placeholder="Username"
              />
              <input type="email" required ref={email} placeholder="Email" />
              <input
                type="password"
                required
                ref={password}
                placeholder="Password"
                minLength="6"
              />
              <input
                type="password"
                required
                ref={confirmPassword}
                placeholder="Confirm Password"
              />
              <button onClick={handleRegister}>Register</button>
              Already have an account?
              <Link to="/login" style={{ color: "inherit" }}>
                Login here!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
