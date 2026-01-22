import { useState, useEffect } from 'react';
import { getAnswerByUserId } from '../../services/answersService';
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./Answers.scss";

function Answers() {
    const [dataAnswers, setDataAnswer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, passed, failed

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const answersByUserId = await getAnswerByUserId();
            const topics = await getListTopic();

            let result = [];

            for (let i = 0; i < answersByUserId.length; i++) {
                const answer = answersByUserId[i];
                const topic = topics.find(item => +item.id === answer.topicId);
                
                // Lấy score và totalQuestions từ database
                const score = answer.score || 0;
                const totalQuestions = answer.totalQuestions || answer.answers?.length || 0;

                console.log('Answer:', {
                    id: answer.id,
                    score: score,
                    total: totalQuestions,
                    percentage: (score / totalQuestions * 100).toFixed(2)
                });

                result.push({
                    ...answer,
                    name: topic?.name || 'Chủ đề',
                    score: score,
                    totalQuestions: totalQuestions
                });
            }

            setDataAnswer(result.reverse());
            setLoading(false);
        }
        fetchApi();
    }, []);

    const getFilteredData = () => {
        if (filter === 'all') return dataAnswers;
        
        return dataAnswers.filter(item => {
            const percentage = (item.score / item.totalQuestions) * 100;
            if (filter === 'passed') return percentage >= 70;
            if (filter === 'failed') return percentage < 70;
            return true;
        });
    };

    const filteredData = getFilteredData();

    if (loading) {
        return (
            <div className="answers-container">
                <div className="answers-loading">
                    <div className="spinner"></div>
                    <p>Đang tải lịch sử...</p>
                </div>
            </div>
        );
    }

    // Tính stats
    const totalTests = dataAnswers.length;
    const passedTests = dataAnswers.filter(item => (item.score / item.totalQuestions * 100) >= 70).length;
    const averageScore = totalTests > 0 
        ? Math.round(dataAnswers.reduce((acc, item) => 
            acc + (item.score / item.totalQuestions * 100), 0) / totalTests)
        : 0;

    return (
        <div className="answers-container">
            {/* Header */}
            <div className="answers-header">
                <div className="answers-header-content">
                    <div className="breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span>›</span>
                        <span className="current">Lịch sử làm bài</span>
                    </div>

                    <h1 className="answers-title">Lịch sử làm bài</h1>
                    <p className="answers-subtitle">
                        Xem lại kết quả các bài kiểm tra bạn đã hoàn thành
                    </p>

                    {/* Stats Summary */}
                    <div className="stats-summary">
                        <div className="stat-card">
                            <div className="stat-icon">📝</div>
                            <div className="stat-content">
                                <div className="stat-number">{totalTests}</div>
                                <div className="stat-label">Tổng số bài</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">✅</div>
                            <div className="stat-content">
                                <div className="stat-number">{passedTests}</div>
                                <div className="stat-label">Bài đạt</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <div className="stat-number">{averageScore}%</div>
                                <div className="stat-label">Điểm trung bình</div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        <button 
                            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Tất cả ({totalTests})
                        </button>
                        <button 
                            className={`filter-tab ${filter === 'passed' ? 'active' : ''}`}
                            onClick={() => setFilter('passed')}
                        >
                            Đã đạt ({passedTests})
                        </button>
                        <button 
                            className={`filter-tab ${filter === 'failed' ? 'active' : ''}`}
                            onClick={() => setFilter('failed')}
                        >
                            Chưa đạt ({totalTests - passedTests})
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="answers-content">
                <div className="answers-content-inner">
                    {filteredData.length > 0 ? (
                        <div className="answers-grid">
                            {filteredData.map((item, index) => {
                                const percentage = Math.round((item.score / item.totalQuestions) * 100);
                                const isPassed = percentage >= 70;
                                const date = item.createdAt ? new Date(item.createdAt) : new Date();
                                
                                return (
                                    <div key={item.id || index} className={`answer-card ${isPassed ? 'passed' : 'failed'}`}>
                                        <div className="answer-card-header">
                                            <div className="topic-info">
                                                <h3 className="topic-name">{item.name}</h3>
                                                <span className="attempt-date">
                                                    {date.toLocaleDateString('vi-VN', { 
                                                        day: '2-digit', 
                                                        month: '2-digit', 
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <div className={`status-badge ${isPassed ? 'badge-passed' : 'badge-failed'}`}>
                                                {isPassed ? (
                                                    <>
                                                        <span className="badge-icon">✓</span>
                                                        Đạt
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="badge-icon">✗</span>
                                                        Chưa đạt
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="answer-card-body">
                                            <div className="score-display">
                                                <div className="score-circle-mini">
                                                    <svg viewBox="0 0 100 100">
                                                        <circle
                                                            cx="50"
                                                            cy="50"
                                                            r="45"
                                                            fill="none"
                                                            stroke="#e5e7eb"
                                                            strokeWidth="8"
                                                        />
                                                        <circle
                                                            cx="50"
                                                            cy="50"
                                                            r="45"
                                                            fill="none"
                                                            stroke={isPassed ? "#10b981" : "#ef4444"}
                                                            strokeWidth="8"
                                                            strokeDasharray={`${percentage * 2.827} 282.7`}
                                                            strokeLinecap="round"
                                                            transform="rotate(-90 50 50)"
                                                        />
                                                    </svg>
                                                    <div className="score-text">
                                                        <span className="score-number">{percentage}</span>
                                                        <span className="score-symbol">%</span>
                                                    </div>
                                                </div>

                                                <div className="score-details-mini">
                                                    <div className="detail-row">
                                                        <span className="detail-label">Điểm số:</span>
                                                        <span className="detail-value">{item.score}/{item.totalQuestions}</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">Đúng:</span>
                                                        <span className="detail-value correct">{item.score} câu</span>
                                                    </div>
                                                    <div className="detail-row">
                                                        <span className="detail-label">Sai:</span>
                                                        <span className="detail-value wrong">{item.totalQuestions - item.score} câu</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="answer-card-footer">
                                            <Link to={`/result/${item.id}`} className="btn-view-detail">
                                                <span>Xem chi tiết</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <h3>Chưa có bài kiểm tra nào</h3>
                            <p>
                                {filter === 'all' 
                                    ? 'Bạn chưa làm bài kiểm tra nào. Hãy bắt đầu ngay!'
                                    : filter === 'passed'
                                    ? 'Bạn chưa có bài nào đạt yêu cầu.'
                                    : 'Tuyệt vời! Bạn chưa có bài nào chưa đạt.'}
                            </p>
                            <Link to="/topic" className="btn-start-quiz">
                                Bắt đầu làm bài
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Answers;