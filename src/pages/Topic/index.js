import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getListTopic } from '../../services/topicService';
import "./Topic.scss";

function Topic() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const response = await getListTopic();
            setTopics(response);
            setLoading(false);
        }
        fetchApi();
    }, []);

    // Map topic IDs to subjects
    const topicSubjects = {
        1: { name: 'HTML5', icon: '🌐', color: 'html', description: 'Cấu trúc và ngữ nghĩa trang web' },
        2: { name: 'CSS3', icon: '🎨', color: 'css', description: 'Styling và thiết kế giao diện' },
        3: { name: 'JavaScript', icon: '⚡', color: 'js', description: 'Lập trình tương tác động' },
        4: { name: 'ReactJS', icon: '⚛️', color: 'react', description: 'Xây dựng ứng dụng hiện đại' }
    };

    if (loading) {
        return (
            <div className="topic-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Đang tải danh sách chủ đề...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="topic-container">
            {/* Header Section */}
            <div className="topic-header">
                <div className="topic-header-content">
                    <div className="breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span className="separator">›</span>
                        <span className="current">Chủ đề</span>
                    </div>
                    <h1 className="topic-title">Chọn chủ đề để bắt đầu</h1>
                    <p className="topic-subtitle">
                        Chọn một chủ đề phù hợp với mục tiêu học tập của bạn. 
                        Mỗi bài test gồm 10 câu hỏi với thời gian làm bài linh hoạt.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="topic-stats">
                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                        <div className="stat-number">{topics.length}</div>
                        <div className="stat-label">Chủ đề có sẵn</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">❓</div>
                    <div className="stat-content">
                        <div className="stat-number">1,000+</div>
                        <div className="stat-label">Câu hỏi</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-content">
                        <div className="stat-number">30-45</div>
                        <div className="stat-label">Phút/bài test</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-content">
                        <div className="stat-number">10</div>
                        <div className="stat-label">Câu/bài test</div>
                    </div>
                </div>
            </div>

            {/* Topics Grid */}
            <div className="topics-grid">
                {topics.length > 0 ? (
                    topics.map(item => {
                        const subject = topicSubjects[item.id] || { 
                            name: item.name, 
                            icon: '📖', 
                            color: 'default',
                            description: 'Chủ đề học tập'
                        };

                        return (
                            <div key={item.id} className={`topic-card ${subject.color}`}>
                                <div className="topic-card-header">
                                    <div className="topic-icon">{subject.icon}</div>
                                    <div className="topic-badge">
                                        <span className="badge-dot"></span>
                                        Đang hoạt động
                                    </div>
                                </div>
                                
                                <div className="topic-card-body">
                                    <h3 className="topic-name">{item.name}</h3>
                                    <p className="topic-description">{subject.description}</p>
                                    
                                    <div className="topic-info">
                                        <div className="info-item">
                                            <span className="info-icon">📝</span>
                                            <span className="info-text">10 câu hỏi</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-icon">⏰</span>
                                            <span className="info-text">30-45 phút</span>
                                        </div>
                                    </div>

                                    <div className="topic-progress">
                                        <div className="progress-header">
                                            <span className="progress-label">Độ khó</span>
                                            <span className="progress-value">
                                                {item.id === 1 ? 'Cơ bản' : 
                                                 item.id === 2 ? 'Trung bình' : 
                                                 item.id === 3 ? 'Nâng cao' : 'Chuyên gia'}
                                            </span>
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill" 
                                                style={{width: `${item.id * 25}%`}}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="topic-card-footer">
                                    <Link to={`/quiz/${item.id}`} className="btn-start">
                                        <span>Bắt đầu làm bài</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                    <button className="btn-preview">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        Xem trước
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📚</div>
                        <h3>Chưa có chủ đề nào</h3>
                        <p>Hiện tại chưa có chủ đề nào được thêm vào hệ thống.</p>
                    </div>
                )}
            </div>

            {/* Help Section */}
            <div className="topic-help">
                <div className="help-card">
                    <div className="help-icon">💡</div>
                    <div className="help-content">
                        <h3>Cần trợ giúp?</h3>
                        <p>Nếu bạn chưa biết nên bắt đầu từ đâu, chúng tôi khuyên bạn nên bắt đầu từ HTML5, sau đó đến CSS3, JavaScript và cuối cùng là ReactJS.</p>
                    </div>
                </div>
                <div className="help-card">
                    <div className="help-icon">📊</div>
                    <div className="help-content">
                        <h3>Theo dõi tiến độ</h3>
                        <p>Sau khi hoàn thành mỗi bài test, bạn có thể xem lại kết quả và theo dõi tiến độ học tập của mình trong phần "Lịch sử".</p>
                    </div>
                </div>
                <div className="help-card">
                    <div className="help-icon">🎯</div>
                    <div className="help-content">
                        <h3>Làm bài nhiều lần</h3>
                        <p>Bạn có thể làm lại mỗi bài test bao nhiêu lần tùy thích để cải thiện kết quả và củng cố kiến thức.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topic;