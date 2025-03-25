import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getUsers, addUsers } from "../services/Users";

const Register = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        username: "",
        password: "",
        gender: "",
        email: "",
        role: "user"
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(res => setUsers(res));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, username, password, gender, email } = formData;

        if (!name || !username || !password || !gender || !email) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const isUserExist = users.find(user => user.username === username);
        if (isUserExist) {
            setError("Tên đăng nhập đã tồn tại.");
            return;
        }

        const newUser = { ...formData, id: users.length + 1 };
        await addUsers(newUser);

        toast.success("Đăng ký thành công!");
        navigate("/login");
    };

    return (
        <div className="auth-page">
  <div className="container page">
    <div className="row">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <a href="/login">Have an account?</a>
        </p>

        <ul className="error-messages">
          <li>That email is already taken</li>
        </ul>

        <form>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Username" />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="text" placeholder="Email" />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" type="password" placeholder="Password" />
          </fieldset>
          <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;
