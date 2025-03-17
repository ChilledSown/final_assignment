import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { resetPassword } from '../services/Users';
import styles from "../style/Login.module.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Mật khẩu nhập lại không khớp với mật khẩu mới");
            return;
        }
        try {
            await resetPassword(id, newPassword);
            setSuccess('Mật khẩu của bạn đã thay đổi thành công');
            setError('');
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles["login-container"]}>
            <div className={styles["login-box"]}>
                <h2 className={styles["login-title"]}>Đặt lại mật khẩu</h2>
                <form onSubmit={handleResetPassword}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="newPassword">Mật khẩu mới</label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles["login-btn"]}>Xác nhận</button>
                    {error && <p className={styles["error"]}>{error}</p>}
                    {success && <p className={styles["success"]}>{success}</p>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
