import React, { useEffect, useState } from "react";
import { getUsers } from "../services/Users";
import { useNavigate } from "react-router";
const Login = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user && user.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user && user.role === "user") {
      navigate("/home");
    } else {
      setError("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại!");
    }
  };
  const handleRegister = () => {
    navigate("/register");
  }
  const handleForgotPassword = () => {
    navigate("/forgot-password")
  }
  console.log(users)
  return (
    <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>
          <p className="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>
  
          <ul className="error-messages">
            <li>That email is already taken</li>
          </ul>
  
          <form>
            <fieldset className="form-group">
              <input className="form-control form-control-lg" type="text" placeholder="Email" />
            </fieldset>
            <fieldset className="form-group">
              <input className="form-control form-control-lg" type="password" placeholder="Password" />
            </fieldset>
            <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
