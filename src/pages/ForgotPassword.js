import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/Login.module.css";
import { checkEmailExist } from "../services/Users";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Vui lòng nhập địa chỉ email của bạn.");
            return;
        }
        try{
            const existedUser = await checkEmailExist(email);
            console.log("Dữ liệu trả về từ API:", existedUser);
            if(!existedUser){
                setError("Email không tồn tại trong hệ thống");
                return;
            }
            setUser(existedUser)
            navigate(`/reset-password/${existedUser.id}`)
        }catch(error){
            console.error(error)
        }
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-box"]}>
                <h2>Quên mật khẩu</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            
                        />
                    </div>

                    <button type="submit" className={styles["login-btn"]}>
                        Đặt lại mật khẩu
                    </button>
                    {error && <p className={`${styles.error} ${styles.show}`}>{error}</p>}

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
