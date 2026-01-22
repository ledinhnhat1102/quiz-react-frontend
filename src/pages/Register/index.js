import { generateToken } from "../../helpers/generateToken";
import { checkExits, register } from "../../services/usersService";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss"; 

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        const checkExitsEmail = await checkExits("email", email);
        if (checkExitsEmail.length > 0) {
            alert("Email đã tồn tại!");
        } else {
            const options = {
                fullName: fullName,
                email: email,
                password: password,
                token: generateToken(),
            };

            const response = await register(options);
            if (response) {
                alert("Đăng ký thành công!");
                navigate("/login");
            } else {
                alert("Đăng ký không thành công");
            }
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* Left Side - Info */}
                <div className="auth-info-section">
                    <div className="auth-info-content">
                        <div className="info-icon">🎓</div>
                        <h2 className="info-title">Bắt đầu hành trình học tập</h2>
                        <p className="info-description">
                            Tham gia cùng hơn 10,000 học viên đang nâng cao kỹ năng 
                            lập trình web của họ mỗi ngày.
                        </p>
                        <div className="info-benefits">
                            <div className="benefit-item">
                                <span className="benefit-icon">🎯</span>
                                <div className="benefit-content">
                                    <h4>Học tập có mục tiêu</h4>
                                    <p>Theo dõi tiến độ và đạt được mục tiêu của bạn</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">📊</span>
                                <div className="benefit-content">
                                    <h4>Phân tích chi tiết</h4>
                                    <p>Xem báo cáo và cải thiện điểm yếu</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">🏆</span>
                                <div className="benefit-content">
                                    <h4>Chứng chỉ uy tín</h4>
                                    <p>Nhận chứng chỉ khi hoàn thành khóa học</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-form-section">
                    <div className="auth-form-content">
                        <div className="auth-header">
                            <h1 className="auth-title">Tạo tài khoản</h1>
                            <p className="auth-subtitle">Đăng ký miễn phí chỉ trong 30 giây</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="fullname" className="form-label">
                                    Họ và tên
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="form-input"
                                        placeholder="Nguyễn Văn A"
                                        required
                                    />
                                </div>
                            </div>

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
                                        placeholder="Tối thiểu 6 ký tự"
                                        required
                                        minLength="6"
                                    />
                                </div>
                                <p className="form-hint">Mật khẩu phải có ít nhất 6 ký tự</p>
                            </div>

                            <div className="form-terms">
                                <label className="checkbox-label">
                                    <input type="checkbox" required />
                                    <span>
                                        Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và 
                                        <a href="#"> Chính sách bảo mật</a>
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span>Tạo tài khoản</span>
                                <span className="btn-arrow">→</span>
                            </button>

                            <div className="form-divider">
                                <span>hoặc đăng ký với</span>
                            </div>

                            <div className="social-login">
                                <button type="button" className="social-btn google">
                                    <svg viewBox="0 0 24 24" width="20" height="20">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Google
                                </button>
                                <button type="button" className="social-btn facebook">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Đã có tài khoản? 
                                <Link to="/login" className="auth-link">Đăng nhập ngay</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;