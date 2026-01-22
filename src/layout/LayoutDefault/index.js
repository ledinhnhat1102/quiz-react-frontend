import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const isLogin = useSelector((state) => state.loginReducer);

  return (
    <div className="layout-default">
      {/* Header */}
      <header className="layout-header">
        <div className="layout-header__container">
          <NavLink to="/" className="layout-header__logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">Quiz Academy</span>
          </NavLink>

          <nav className="layout-header__nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Trang chủ
            </NavLink>

            {isLogin && (
              <>
                <NavLink to="/topic" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                  Chủ đề
                </NavLink>
                <NavLink to="/answers" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                  Lịch sử
                </NavLink>
              </>
            )}
          </nav>

          <div className="layout-header__actions">
            {isLogin ? (
              <NavLink to="/logout" className="btn btn-logout">
                <span>👋</span> Đăng xuất
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-login">
                  Đăng nhập
                </NavLink>
                <NavLink to="/register" className="btn btn-register">
                  Đăng ký
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="layout-main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="layout-footer__container">
          <div className="footer-top">
            {/* Column 1 */}
            <div className="footer-column">
              <h3 className="footer-title">
                <span className="footer-logo-icon">📚</span>
                Quiz Academy
              </h3>
              <p className="footer-description">
                Nền tảng học tập trực tuyến hàng đầu về HTML, CSS, JavaScript và ReactJS.
                Nâng cao kiến thức và kỹ năng lập trình web của bạn.
              </p>

              <div className="footer-social">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="footer-column">
              <h4 className="footer-heading">Học tập</h4>
              <ul className="footer-links">
                <li>
                  <NavLink to="/topic">Danh sách chủ đề</NavLink>
                </li>
                <li>
                  <NavLink to="/answers">Lịch sử làm bài</NavLink>
                </li>
                <li>
                  <button className="footer-link-btn">Hướng dẫn sử dụng</button>
                </li>
                <li>
                  <button className="footer-link-btn">Câu hỏi thường gặp</button>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="footer-column">
              <h4 className="footer-heading">Về chúng tôi</h4>
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn">Giới thiệu</button>
                </li>
                <li>
                  <button className="footer-link-btn">Đội ngũ</button>
                </li>
                <li>
                  <button className="footer-link-btn">Liên hệ</button>
                </li>
                <li>
                  <button className="footer-link-btn">Tuyển dụng</button>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="footer-column">
              <h4 className="footer-heading">Hỗ trợ</h4>
              <ul className="footer-links">
                <li>
                  <button className="footer-link-btn">Trung tâm trợ giúp</button>
                </li>
                <li>
                  <button className="footer-link-btn">Điều khoản dịch vụ</button>
                </li>
                <li>
                  <button className="footer-link-btn">Chính sách bảo mật</button>
                </li>
                <li>
                  <button className="footer-link-btn">Báo cáo lỗi</button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Quiz Academy. Tất cả quyền được bảo lưu.
            </p>
            <div className="footer-bottom-links">
              <button className="footer-link-btn">Điều khoản</button>
              <span className="separator">•</span>
              <button className="footer-link-btn">Quyền riêng tư</button>
              <span className="separator">•</span>
              <button className="footer-link-btn">Cookie</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LayoutDefault;
