import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionsService";
import "./Result.css";

function Result() {
    const params = useParams();
    const [dataResult, setDataResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const dataAnswers = await getAnswer(params.id);
            const dataQuestions = await getListQuestion(dataAnswers.topicId);

            let resultFinal = [];
            let correctCount = 0;

            for (let i = 0; i < dataQuestions.length; i++) {
                // FIX: Sử dụng === thay vì ==== để so sánh không phân biệt kiểu
                const userAnswer = dataAnswers.answers.find(item => item.questionId === dataQuestions[i].id);
                
                // FIX: Sử dụng === thay vì ==== và kiểm tra answer không phải -1
                const isCorrect = userAnswer && 
                                  userAnswer.answer != -1 && 
                                  dataQuestions[i].correctAnswer === userAnswer.answer;
                
                if (isCorrect) correctCount++;

                resultFinal.push({
                    ...dataQuestions[i],
                    ...userAnswer
                });
            }

            setDataResult(resultFinal);
            setScore(correctCount);
            setTotalQuestions(dataQuestions.length);
            setLoading(false);
        }
        fetchApi();
    }, [params.id]);

    if (loading) {
        return (
            <div className="result-container">
                <div className="result-loading">
                    <div className="spinner"></div>
                    <p>Đang tải kết quả...</p>
                </div>
            </div>
        );
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 70;

    // Determine performance level
    let performanceLevel = '';
    let performanceEmoji = '';
    let performanceMessage = '';

    if (percentage >= 90) {
        performanceLevel = 'Xuất sắc';
        performanceEmoji = '🏆';
        performanceMessage = 'Tuyệt vời! Bạn đã thành thạo chủ đề này!';
    } else if (percentage >= 80) {
        performanceLevel = 'Rất tốt';
        performanceEmoji = '🌟';
        performanceMessage = 'Làm tốt lắm! Bạn đã nắm vững kiến thức!';
    } else if (percentage >= 70) {
        performanceLevel = 'Tốt';
        performanceEmoji = '✅';
        performanceMessage = 'Bạn đã đạt yêu cầu! Tiếp tục phát huy nhé!';
    } else if (percentage >= 50) {
        performanceLevel = 'Khá';
        performanceEmoji = '📚';
        performanceMessage = 'Bạn cần ôn lại một số kiến thức!';
    } else {
        performanceLevel = 'Cần cố gắng';
        performanceEmoji = '💪';
        performanceMessage = 'Đừng nản! Hãy thử lại để cải thiện kết quả!';
    }

    return (
        <div className="result-container">
            {/* Header with Score */}
            <div className="result-header">
                <div className="result-header-content">
                    <div className="breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span>›</span>
                        <Link to="/topic">Chủ đề</Link>
                        <span>›</span>
                        <Link to="/answers">Lịch sử</Link>
                        <span>›</span>
                        <span className="current">Kết quả</span>
                    </div>

                    <div className="score-card">
                        <div className="score-emoji">{performanceEmoji}</div>
                        <h1 className="score-title">{performanceLevel}</h1>
                        <p className="score-message">{performanceMessage}</p>
                        
                        <div className="score-display">
                            <div className="score-circle">
                                <svg viewBox="0 0 200 200">
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="90"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="12"
                                    />
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="90"
                                        fill="none"
                                        stroke={isPassed ? "#10b981" : "#ef4444"}
                                        strokeWidth="12"
                                        strokeDasharray={`${percentage * 5.65} 565`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 100 100)"
                                    />
                                </svg>
                                <div className="score-number">
                                    <span className="score-value">{percentage}</span>
                                    <span className="score-unit">%</span>
                                </div>
                            </div>
                            
                            <div className="score-details">
                                <div className="detail-item correct">
                                    <div className="detail-icon">✓</div>
                                    <div className="detail-content">
                                        <div className="detail-number">{score}</div>
                                        <div className="detail-label">Câu đúng</div>
                                    </div>
                                </div>
                                <div className="detail-item wrong">
                                    <div className="detail-icon">✗</div>
                                    <div className="detail-content">
                                        <div className="detail-number">{totalQuestions - score}</div>
                                        <div className="detail-label">Câu sai</div>
                                    </div>
                                </div>
                                <div className="detail-item total">
                                    <div className="detail-icon">∑</div>
                                    <div className="detail-content">
                                        <div className="detail-number">{totalQuestions}</div>
                                        <div className="detail-label">Tổng số câu</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <Link to="/topic" className="btn btn-primary">
                                <span>🏠</span>
                                Về trang chủ đề
                            </Link>
                            <Link to="/answers" className="btn btn-secondary">
                                <span>📊</span>
                                Xem lịch sử
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Review */}
            <div className="result-content">
                <div className="result-content-inner">
                    <div className="section-header">
                        <h2 className="section-title">Xem lại đáp án chi tiết</h2>
                        <p className="section-subtitle">
                            Đánh dấu những câu sai để ôn tập lại nhé!
                        </p>
                    </div>

                    <div className="questions-list">
                        {dataResult.map((item, index) => {
                            // FIX: Sử dụng === thay vì ==== và kiểm tra answer không phải -1
                            const isCorrect = item.answer != -1 && item.correctAnswer === item.answer;
                            const isUnanswered = item.answer === -1 || item.answer === undefined;
                            
                            return (
                                <div key={item.id} className={`question-card ${isCorrect ? 'correct' : isUnanswered ? 'unanswered' : 'wrong'}`}>
                                    <div className="question-header">
                                        <div className="question-number-badge">
                                            <span className="badge-number">Câu {index + 1}</span>
                                            <span className={`badge-status ${isCorrect ? 'status-correct' : isUnanswered ? 'status-unanswered' : 'status-wrong'}`}>
                                                {isCorrect ? (
                                                    <>
                                                        <span className="status-icon">✓</span>
                                                        Đúng
                                                    </>
                                                ) : isUnanswered ? (
                                                    <>
                                                        <span className="status-icon">○</span>
                                                        Chưa trả lời
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="status-icon">✗</span>
                                                        Sai
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="question-body">
                                        <h3 className="question-text">{item.question}</h3>

                                        <div className="answers-list">
                                            {item.answers.map((itemAns, indexAns) => {
                                                // FIX: Sử dụng === thay vì ==== để so sánh
                                                const isUserAnswer = item.answer === indexAns;
                                                const isCorrectAnswer = item.correctAnswer === indexAns;
                                                const optionLabel = String.fromCharCode(65 + indexAns);

                                                let answerClass = 'answer-item';
                                                if (isCorrectAnswer) {
                                                    answerClass += ' answer-correct';
                                                }
                                                if (isUserAnswer && !isCorrectAnswer) {
                                                    answerClass += ' answer-wrong';
                                                }

                                                return (
                                                    <div key={indexAns} className={answerClass}>
                                                        <div className="answer-label">{optionLabel}</div>
                                                        <div className="answer-text">{itemAns}</div>
                                                        {isCorrectAnswer && (
                                                            <div className="answer-badge badge-correct">
                                                                <span className="badge-icon">✓</span>
                                                                Đáp án đúng
                                                            </div>
                                                        )}
                                                        {isUserAnswer && !isCorrectAnswer && (
                                                            <div className="answer-badge badge-wrong">
                                                                <span className="badge-icon">✗</span>
                                                                Bạn đã chọn
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary Card */}
                    <div className="summary-card">
                        <div className="summary-icon">
                            {isPassed ? '🎉' : '💪'}
                        </div>
                        <h3 className="summary-title">
                            {isPassed ? 'Chúc mừng bạn đã hoàn thành!' : 'Đừng bỏ cuộc!'}
                        </h3>
                        <p className="summary-text">
                            {isPassed 
                                ? 'Bạn có thể thử các chủ đề khác hoặc làm lại để đạt điểm cao hơn.'
                                : 'Hãy xem lại các câu sai và thử lại. Bạn sẽ làm được!'}
                        </p>
                        <div className="summary-actions">
                            <Link to="/topic" className="btn btn-outline">
                                Chọn chủ đề khác
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;