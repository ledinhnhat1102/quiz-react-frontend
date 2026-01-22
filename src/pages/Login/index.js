import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/usersService";
import { useNavigate, Link } from "react-router-dom";
import { checkLogin } from "../../actions/login";
import { useState } from "react";
import "./Login.scss";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);

            if (response && response.length > 0) {
                const user = response[0];

                setCookie("id", user.id, 1);
                setCookie("fullName", user.fullName, 1);
                setCookie("email", user.email, 1);
                setCookie("token", user.token, 1);

                dispatch(checkLogin(true));
                navigate("/");
            } else {
                alert("Tài khoản hoặc mật khẩu không chính xác!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* Left Side */}
                <div className="auth-form-section">
                    <div className="auth-form-content">
                        <div className="auth-header">
                            <h1 className="auth-title">Chào mừng trở lại!</h1>
                            <p className="auth-subtitle">
                                Đăng nhập để tiếp tục học tập
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📧</span>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-input"
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Mật khẩu
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>
                                <span className="forgot-link">
                                    Quên mật khẩu?
                                </span>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span>Đăng nhập</span>
                                <span className="btn-arrow">→</span>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Chưa có tài khoản?
                                <Link to="/register" className="auth-link">
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="auth-info-section">
                    <div className="auth-info-content">
                        <div className="info-icon">📚</div>
                        <h2 className="info-title">Quiz Academy</h2>
                        <p className="info-description">
                            Nền tảng học tập trực tuyến với hàng nghìn câu hỏi
                            HTML, CSS, JavaScript và ReactJS.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
