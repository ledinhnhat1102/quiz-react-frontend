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
                fullName,
                email,
                password,
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
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* Left Side */}
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

                {/* Right Side */}
                <div className="auth-form-section">
                    <div className="auth-form-content">
                        <h1 className="auth-title">Tạo tài khoản</h1>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input type="text" required />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" required />
                            </div>

                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input type="password" minLength={6} required />
                            </div>

                            <div className="form-terms">
                                <label className="checkbox-label">
                                    <input type="checkbox" required />
                                    <span>
                                        Tôi đồng ý với{" "}
                                        <Link to="/terms" className="auth-link">
                                            Điều khoản dịch vụ
                                        </Link>{" "}
                                        và{" "}
                                        <Link to="/privacy" className="auth-link">
                                            Chính sách bảo mật
                                        </Link>
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit">
                                Tạo tài khoản →
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
