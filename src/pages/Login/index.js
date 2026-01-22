import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/usersService";
import { useNavigate, Link } from "react-router-dom";
import { checkLogin } from "../../actions/login";
import "./Login.scss";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        const response = await login(email, password);
        if (response.length > 0) {
            setCookie("id", response[0].id, 1);
            setCookie("fullName", response[0].fullName, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            dispatch(checkLogin(true));
            navigate("/");
        } else {
            alert("Tài khoản hoặc mật khẩu không chính xác!");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* Left Side - Form */}
                <div className="auth-form-section">
                    <div className="auth-form-content">
                        <div className="auth-header">
                            <h1 className="auth-title">Chào mừng trở lại!</h1>
                            <p className="auth-subtitle">Đăng nhập để tiếp tục học tập</p>
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>
                                <a href="#" className="forgot-link">Quên mật khẩu?</a>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span>Đăng nhập</span>
                                <span className="btn-arrow">→</span>
                            </button>

                            <div className="form-divider">
                                <span>hoặc</span>
                            </div>

                            <div className="social-login">
                                <button type="button" className="social-btn google">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Đăng nhập với Google
                                </button>
                                <button type="button" className="social-btn facebook">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Đăng nhập với Facebook
                                </button>
                            </div>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Chưa có tài khoản? 
                                <Link to="/register" className="auth-link">Đăng ký ngay</Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Info */}
                <div className="auth-info-section">
                    <div className="auth-info-content">
                        <div className="info-icon">📚</div>
                        <h2 className="info-title">Quiz Academy</h2>
                        <p className="info-description">
                            Nền tảng học tập trực tuyến hàng đầu với hơn 1000+ câu hỏi 
                            chất lượng cao về HTML, CSS, JavaScript và ReactJS.
                        </p>
                        <div className="info-stats">
                            <div className="stat-item">
                                <div className="stat-number">10,000+</div>
                                <div className="stat-label">Học viên</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">1,000+</div>
                                <div className="stat-label">Câu hỏi</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">4.8/5</div>
                                <div className="stat-label">Đánh giá</div>
                            </div>
                        </div>
                        <div className="info-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Hoàn toàn miễn phí</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Học mọi lúc mọi nơi</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Chứng chỉ hoàn thành</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;