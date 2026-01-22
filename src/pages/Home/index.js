import { Link } from "react-router-dom";
import "./Home.scss";

function Home(){
    return(
        <>
            <div className="home-container">
                {/* Hero Section */}
                <header className="home-hero">
                    <div className="home-hero__content">
                        <div className="hero-badge">
                            <span>🏆</span> Nền tảng học tập trực tuyến hàng đầu
                        </div>
                        <h1 className="home-hero__title">
                            Nâng cao kiến thức lập trình web với <span className="highlight">Quiz Trắc Nghiệm</span>
                        </h1>
                        <p className="home-hero__description">
                            Hệ thống kiểm tra trắc nghiệm toàn diện về HTML5, CSS3, JavaScript và ReactJS. 
                            Rèn luyện kỹ năng, đánh giá năng lực và chuẩn bị cho phỏng vấn việc làm.
                        </p>
                        <div className="hero-actions">
                            <Link to="/topic" className="btn btn-primary">
                                <span>🚀</span> Bắt đầu làm bài
                            </Link>
                            <Link to="/register" className="btn btn-secondary">
                                <span>📝</span> Đăng ký miễn phí
                            </Link>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">10,000+</div>
                                <div className="stat-label">Học viên đã tham gia</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">1,000+</div>
                                <div className="stat-label">Câu hỏi chất lượng</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">4.8/5</div>
                                <div className="stat-label">Đánh giá trung bình</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Subjects Section */}
                <section className="home-subjects">
                    <div className="section-header">
                        <h2 className="section-title">Danh mục môn học</h2>
                        <p className="section-subtitle">Chọn chủ đề phù hợp với trình độ và mục tiêu của bạn</p>
                    </div>

                    <div className="subjects-grid">
                        <div className="subject-card html">
                            <div className="card-header">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3H20L18 21L12 23L6 21L4 3Z" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M8 7H16M8 11H16M8 15H14" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                                <h3>HTML5</h3>
                                <span className="badge badge-beginner">Cơ bản</span>
                            </div>
                            <p className="card-description">
                                Nắm vững cấu trúc trang web, các thẻ HTML semantic, form validation, 
                                và các tính năng mới của HTML5 như Canvas, Video, Audio.
                            </p>
                            <div className="card-features">
                                <div className="feature-item">
                                    <span className="icon">📚</span>
                                    <span>250+ câu hỏi</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">⏱️</span>
                                    <span>30 phút/bài</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">🎯</span>
                                    <span>10 câu/bài test</span>
                                </div>
                            </div>
                            <div className="card-topics">
                                <span className="topic-tag">Semantic HTML</span>
                                <span className="topic-tag">Forms</span>
                                <span className="topic-tag">Multimedia</span>
                                <span className="topic-tag">SEO</span>
                            </div>
                            <Link to="/topic" className="card-button">
                                Làm bài ngay <span>→</span>
                            </Link>
                        </div>

                        <div className="subject-card css">
                            <div className="card-header">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                                <h3>CSS3</h3>
                                <span className="badge badge-intermediate">Trung bình</span>
                            </div>
                            <p className="card-description">
                                Thiết kế giao diện đẹp mắt với Flexbox, Grid Layout, Animations, 
                                Responsive Design và các kỹ thuật styling hiện đại.
                            </p>
                            <div className="card-features">
                                <div className="feature-item">
                                    <span className="icon">📚</span>
                                    <span>300+ câu hỏi</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">⏱️</span>
                                    <span>35 phút/bài</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">🎯</span>
                                    <span>10 câu/bài test</span>
                                </div>
                            </div>
                            <div className="card-topics">
                                <span className="topic-tag">Flexbox</span>
                                <span className="topic-tag">Grid</span>
                                <span className="topic-tag">Animations</span>
                                <span className="topic-tag">Responsive</span>
                            </div>
                            <Link to="/topic" className="card-button">
                                Làm bài ngay <span>→</span>
                            </Link>
                        </div>

                        <div className="subject-card javascript">
                            <div className="card-header">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.306 8.711c-2.602.723-4.306 1.926-4.306 3.289 0 2.21 4.477 4 10 4s10-1.79 10-4" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M5 12v7c0 1.657 3.134 3 7 3s7-1.343 7-3v-7M12 8V2M8 6l4-4 4 4" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                                <h3>JavaScript</h3>
                                <span className="badge badge-advanced">Nâng cao</span>
                            </div>
                            <p className="card-description">
                                Làm chủ JavaScript ES6+, xử lý bất đồng bộ, DOM manipulation, 
                                OOP, Functional Programming và các design patterns phổ biến.
                            </p>
                            <div className="card-features">
                                <div className="feature-item">
                                    <span className="icon">📚</span>
                                    <span>350+ câu hỏi</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">⏱️</span>
                                    <span>40 phút/bài</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">🎯</span>
                                    <span>10 câu/bài test</span>
                                </div>
                            </div>
                            <div className="card-topics">
                                <span className="topic-tag">ES6+</span>
                                <span className="topic-tag">Async/Await</span>
                                <span className="topic-tag">Closure</span>
                                <span className="topic-tag">DOM</span>
                            </div>
                            <Link to="/topic" className="card-button">
                                Làm bài ngay <span>→</span>
                            </Link>
                        </div>

                        <div className="subject-card react">
                            <div className="card-header">
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                                <h3>ReactJS</h3>
                                <span className="badge badge-expert">Chuyên gia</span>
                            </div>
                            <p className="card-description">
                                Xây dựng ứng dụng web hiện đại với React Hooks, State Management, 
                                Redux, React Router và các best practices trong React development.
                            </p>
                            <div className="card-features">
                                <div className="feature-item">
                                    <span className="icon">📚</span>
                                    <span>300+ câu hỏi</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">⏱️</span>
                                    <span>45 phút/bài</span>
                                </div>
                                <div className="feature-item">
                                    <span className="icon">🎯</span>
                                    <span>10 câu/bài test</span>
                                </div>
                            </div>
                            <div className="card-topics">
                                <span className="topic-tag">Hooks</span>
                                <span className="topic-tag">Redux</span>
                                <span className="topic-tag">Router</span>
                                <span className="topic-tag">Context API</span>
                            </div>
                            <Link to="/topic" className="card-button">
                                Làm bài ngay <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="home-how-it-works">
                    <div className="section-header">
                        <h2 className="section-title">Cách thức hoạt động</h2>
                        <p className="section-subtitle">4 bước đơn giản để bắt đầu học tập hiệu quả</p>
                    </div>
                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-number">01</div>
                            <div className="step-icon">📝</div>
                            <h3>Đăng ký tài khoản</h3>
                            <p>Tạo tài khoản miễn phí chỉ trong 30 giây. Không cần thẻ tín dụng.</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-item">
                            <div className="step-number">02</div>
                            <div className="step-icon">🎯</div>
                            <h3>Chọn chủ đề</h3>
                            <p>Lựa chọn môn học phù hợp với trình độ và mục tiêu của bạn.</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-item">
                            <div className="step-number">03</div>
                            <div className="step-icon">✍️</div>
                            <h3>Làm bài kiểm tra</h3>
                            <p>Trả lời các câu hỏi trắc nghiệm được thiết kế bài bản và khoa học.</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step-item">
                            <div className="step-number">04</div>
                            <div className="step-icon">📊</div>
                            <h3>Xem kết quả</h3>
                            <p>Nhận phản hồi chi tiết và theo dõi tiến độ học tập của bạn.</p>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="home-features">
                    <div className="section-header">
                        <h2 className="section-title">Tính năng nổi bật</h2>
                        <p className="section-subtitle">Những gì làm nên sự khác biệt của chúng tôi</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <span>🎯</span>
                            </div>
                            <h3>Câu hỏi chất lượng cao</h3>
                            <p>
                                Hơn 1000+ câu hỏi được biên soạn bởi các chuyên gia có nhiều năm kinh nghiệm 
                                trong ngành. Mỗi câu hỏi đều có giải thích chi tiết giúp bạn hiểu sâu hơn.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <span>📊</span>
                            </div>
                            <h3>Theo dõi tiến độ</h3>
                            <p>
                                Hệ thống phân tích thông minh giúp bạn theo dõi điểm số, xác định điểm mạnh, 
                                điểm yếu và đưa ra lộ trình học tập cá nhân hóa phù hợp.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <span>⚡</span>
                            </div>
                            <h3>Học mọi lúc mọi nơi</h3>
                            <p>
                                Truy cập nền tảng trên mọi thiết bị - máy tính, tablet, điện thoại. 
                                Học tập linh hoạt theo thời gian và tốc độ phù hợp với bạn.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <span>🏆</span>
                            </div>
                            <h3>Hoàn toàn miễn phí</h3>
                            <p>
                                Tất cả tính năng đều miễn phí cho mọi người. Không có phí ẩn, 
                                không quảng cáo phiền nhiễu. Chỉ cần đăng ký và bắt đầu học ngay.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <span>🎓</span>
                            </div>
                            <h3>Chứng chỉ hoàn thành</h3>
                            <p>
                                Nhận chứng chỉ điện tử khi hoàn thành các khóa học. 
                                Chứng chỉ có thể chia sẻ trên LinkedIn và hồ sơ xin việc của bạn.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <span>💬</span>
                            </div>
                            <h3>Cộng đồng hỗ trợ</h3>
                            <p>
                                Tham gia cộng đồng hơn 10,000 học viên. Trao đổi kinh nghiệm, 
                                hỏi đáp và học hỏi lẫn nhau trong quá trình học tập.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="home-testimonials">
                    <div className="section-header">
                        <h2 className="section-title">Học viên nói gì về chúng tôi</h2>
                        <p className="section-subtitle">Những phản hồi chân thực từ cộng đồng học viên</p>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-rating">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="testimonial-text">
                                "Đây là nền tảng tốt nhất mà tôi từng sử dụng để học lập trình web. 
                                Câu hỏi rất hay và thực tế, giúp tôi chuẩn bị tốt cho phỏng vấn."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">NV</div>
                                <div className="author-info">
                                    <h4>Nguyễn Văn A</h4>
                                    <p>Frontend Developer tại FPT Software</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-rating">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="testimonial-text">
                                "Giao diện đẹp, dễ sử dụng và quan trọng nhất là hoàn toàn miễn phí. 
                                Tôi đã học được rất nhiều kiến thức mới từ đây."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">TTH</div>
                                <div className="author-info">
                                    <h4>Trần Thị Hương</h4>
                                    <p>Sinh viên năm 3 - ĐH Bách Khoa</p>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-rating">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="testimonial-text">
                                "Hệ thống theo dõi tiến độ rất chi tiết giúp tôi biết mình cần cải thiện ở đâu. 
                                Sau 2 tháng học, tôi đã tự tin hơn rất nhiều!"
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">LMT</div>
                                <div className="author-info">
                                    <h4>Lê Minh Tuấn</h4>
                                    <p>Fullstack Developer tại VNG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="home-cta">
                    <div className="cta-content">
                        <h2>Sẵn sàng nâng cao kỹ năng lập trình?</h2>
                        <p>Tham gia cùng hơn 10,000 học viên đang học tập trên nền tảng của chúng tôi</p>
                        <div className="cta-actions">
                            <Link to="/register" className="btn btn-cta-primary">
                                Đăng ký miễn phí ngay
                            </Link>
                            <Link to="/topic" className="btn btn-cta-secondary">
                                Xem danh sách bài test
                            </Link>
                        </div>
                        <p className="cta-note">✓ Không cần thẻ tín dụng  ✓ Học mọi lúc mọi nơi  ✓ Hoàn toàn miễn phí</p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="home-faq">
                    <div className="section-header">
                        <h2 className="section-title">Câu hỏi thường gặp</h2>
                        <p className="section-subtitle">Những thắc mắc phổ biến từ học viên</p>
                    </div>
                    <div className="faq-list">
                        <div className="faq-item">
                            <h3>❓ Tôi có cần trả phí để sử dụng không?</h3>
                            <p>
                                Không, tất cả các tính năng của nền tảng đều hoàn toàn miễn phí. 
                                Chúng tôi tin rằng giáo dục nên được tiếp cận bởi mọi người.
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>❓ Tôi có cần kiến thức nền tảng trước khi bắt đầu?</h3>
                            <p>
                                Không nhất thiết. Chúng tôi có các bài test từ cơ bản đến nâng cao. 
                                Bạn có thể bắt đầu từ mức độ phù hợp với trình độ hiện tại.
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>❓ Làm thế nào để theo dõi tiến độ học tập?</h3>
                            <p>
                                Sau khi đăng nhập, bạn có thể xem lịch sử làm bài, điểm số chi tiết 
                                và phân tích tiến độ trong phần "Answers".
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>❓ Tôi có thể làm lại bài test đã làm không?</h3>
                            <p>
                                Có, bạn có thể làm lại bất kỳ bài test nào bao nhiêu lần tùy thích 
                                để cải thiện kết quả và củng cố kiến thức.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Home;