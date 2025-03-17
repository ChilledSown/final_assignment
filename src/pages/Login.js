import React, { useEffect, useState } from "react";
import styles from "../style/Login.module.css";
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
  return (
    <div className={styles["login-container"]}>
    <div className={styles["login-box"]}>
      <h2>Đăng nhập</h2>
      <form>
        <div className={styles["form-group"]}>
          <label htmlFor="username">Tên tài khoản</label>
          <input
            type="text"
            id="username"
            placeholder="Nhập tên tài khoản của bạn"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu của bạn"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles["login-btn"]} onClick={handleLogin}>
          Đăng nhập
        </button>
        {error && <p className={styles["error"]}>{error}</p>}
        <p className={styles["forgot-password"]}>Quên mật khẩu?</p>
        <p className={styles["forgot-password"]} onClick={handleRegister}>
          Chưa có tài khoản? Đăng ký ngay
        </p>
      </form>
    </div>
  </div>
  );
};

export default Login;
