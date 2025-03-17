import React, { useEffect, useState } from "react";
import styles from "../style/Register.module.css";
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
        <div className={styles["register-container"]}>
            <div className={styles["register-box"]}>
                <h2>Đăng ký</h2>
                <form onSubmit={handleRegister}>
                    {['name', 'username', 'password', 'email'].map((field) => (
                        <div key={field} className={styles["form-group"]}>
                            <label htmlFor={field}>
                                {field === "name" ? "Tên" :
                                field === "username" ? "Tên đăng nhập" :
                                field === "password" ? "Mật khẩu" : "Email"}
                            </label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                id={field}
                                name={field}
                                placeholder={`Nhập ${
                                    field === "name" ? "tên" :
                                    field === "username" ? "tên đăng nhập" :
                                    field === "password" ? "mật khẩu" : "email"
                                }`}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}

                    <div className={styles["form-group"]}>
                        <label htmlFor="gender">Giới tính</label>
                        <select id="gender" name="gender" onChange={handleChange} required>
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>

                    <button type="submit" className={styles["register-btn"]}>
                        Đăng ký
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
