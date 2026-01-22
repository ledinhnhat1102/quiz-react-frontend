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
            return;
        }

        const response = await register({
            fullName,
            email,
            password,
            token: generateToken(),
        });

        if (response) {
            alert("Đăng ký thành công!");
            navigate("/login");
        } else {
            alert("Đăng ký không thành công");
        }
    };

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
                                        Tôi đồng ý với{" "}
                                        <Link to="/terms">Điều khoản dịch vụ</Link> và{" "}
                                        <Link to="/privacy">Chính sách bảo mật</Link>
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span>Tạo tài khoản</span>
                                <span className="btn-arrow">→</span>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Đã có tài khoản?{" "}
                                <Link to="/login" className="auth-link">
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
