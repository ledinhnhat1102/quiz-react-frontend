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

            // ===== THÊM DEBUG =====
        console.log("dataAnswers:", dataAnswers);
        console.log("dataQuestions:", dataQuestions);
        console.log("answers array:", dataAnswers.answers);
        // ======================

            let correctCount = 0;
            const resultFinal = [];

            for (let i = 0; i < dataQuestions.length; i++) {
                const userAnswer = dataAnswers.answers.find(
                    (item) => item.questionId === dataQuestions[i].id
                );

                const isCorrect =
                    userAnswer !== undefined &&
                    userAnswer.answer !== -1 &&
                    dataQuestions[i].correctAnswer === userAnswer.answer;

                if (isCorrect) {
                    correctCount += 1;
                }

                resultFinal.push({
                    ...dataQuestions[i],
                    ...userAnswer,
                });
            }

            setDataResult(resultFinal);
            setScore(correctCount);
            setTotalQuestions(dataQuestions.length);
            setLoading(false);
        };

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

    let performanceLevel = "";
    let performanceEmoji = "";
    let performanceMessage = "";

    if (percentage >= 90) {
        performanceLevel = "Xuất sắc";
        performanceEmoji = "🏆";
        performanceMessage = "Tuyệt vời! Bạn đã thành thạo chủ đề này!";
    } else if (percentage >= 80) {
        performanceLevel = "Rất tốt";
        performanceEmoji = "🌟";
        performanceMessage = "Làm tốt lắm! Bạn đã nắm vững kiến thức!";
    } else if (percentage >= 70) {
        performanceLevel = "Tốt";
        performanceEmoji = "✅";
        performanceMessage = "Bạn đã đạt yêu cầu! Tiếp tục phát huy nhé!";
    } else if (percentage >= 50) {
        performanceLevel = "Khá";
        performanceEmoji = "📚";
        performanceMessage = "Bạn cần ôn lại một số kiến thức!";
    } else {
        performanceLevel = "Cần cố gắng";
        performanceEmoji = "💪";
        performanceMessage = "Đừng nản! Hãy thử lại để cải thiện kết quả!";
    }

    return (
        <div className="result-container">
            {/* Header */}
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
                                        <div className="detail-number">
                                            {totalQuestions - score}
                                        </div>
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
                                🏠 Về trang chủ đề
                            </Link>
                            <Link to="/answers" className="btn btn-secondary">
                                📊 Xem lịch sử
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review */}
            <div className="result-content">
                <div className="result-content-inner">
                    <div className="questions-list">
                        {dataResult.map((item, index) => {
                            const isCorrect =
                                item.answer !== -1 &&
                                item.answer !== undefined &&
                                item.correctAnswer === item.answer;

                            const isUnanswered =
                                item.answer === -1 || item.answer === undefined;

                            return (
                                <div
                                    key={item.id}
                                    className={`question-card ${
                                        isCorrect
                                            ? "correct"
                                            : isUnanswered
                                            ? "unanswered"
                                            : "wrong"
                                    }`}
                                >
                                    <h3 className="question-text">
                                        Câu {index + 1}: {item.question}
                                    </h3>

                                    <div className="answers-list">
                                        {item.answers.map((ans, ansIndex) => {
                                            const isUserAnswer =
                                                item.answer === ansIndex;
                                            const isCorrectAnswer =
                                                item.correctAnswer === ansIndex;

                                            let cls = "answer-item";
                                            if (isCorrectAnswer) cls += " answer-correct";
                                            if (isUserAnswer && !isCorrectAnswer)
                                                cls += " answer-wrong";

                                            return (
                                                <div key={ansIndex} className={cls}>
                                                    {ans}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;
