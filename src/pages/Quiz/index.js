import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";
import "./Quiz.scss";

function Quiz() {
    const params = useParams();
    const [dataTopic, setDataTopic] = useState(null);
    const [dataQuestions, setDataQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 phút
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopic(params.id);
            setDataTopic(response);
        }
        fetchApi();
    }, [params.id]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListQuestion(params.id);
            setDataQuestions(response);
        }
        fetchApi();
    }, [params.id]);

    // Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(null, true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (questionId, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerIndex
        });
    };

    const handleSubmit = async (e, autoSubmit = false) => {
        if (e) e.preventDefault();
        
        if (!autoSubmit && Object.keys(selectedAnswers).length < dataQuestions.length) {
            const confirm = window.confirm(
                `Bạn mới trả lời ${Object.keys(selectedAnswers).length}/${dataQuestions.length} câu hỏi. Bạn có chắc muốn nộp bài không?`
            );
            if (!confirm) return;
        }

        setIsSubmitting(true);

        // Tạo mảng answers và TÍNH ĐIỂM ngay tại đây
        let answers = [];
        let correctCount = 0;

        dataQuestions.forEach(question => {
            const userAnswer = selectedAnswers[question.id] !== undefined 
                ? parseInt(selectedAnswers[question.id]) 
                : -1;
            
            // Kiểm tra đáp án đúng
            if (userAnswer === question.correctAnswer) {
                correctCount++;
            }

            answers.push({
                questionId: parseInt(question.id),
                answer: userAnswer
            });
        });

        // Tạo object để gửi lên server - BẮT BUỘC phải có score
        let options = {
            userId: parseInt(getCookie("id")),
            topicId: parseInt(params.id),
            answers: answers,
            score: correctCount,  // ← QUAN TRỌNG: Gửi score lên server
            totalQuestions: dataQuestions.length
        };

        console.log('Submitting with score:', correctCount, '/', dataQuestions.length);

        try {
            const response = await createAnswer(options);
            if (response && response.id) {
                navigate(`/result/${response.id}`);
            } else {
                alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!");
            setIsSubmitting(false);
        }
    };

    const getAnsweredCount = () => {
        return Object.keys(selectedAnswers).length;
    };

    const progressPercentage = (getAnsweredCount() / dataQuestions.length) * 100;

    if (!dataTopic || dataQuestions.length === 0) {
        return (
            <div className="quiz-container">
                <div className="quiz-loading">
                    <div className="spinner"></div>
                    <p>Đang tải bài kiểm tra...</p>
                </div>
            </div>
        );
    }

    const currentQ = dataQuestions[currentQuestion];

    return (
        <div className="quiz-container">
            {/* Header */}
            <div className="quiz-header">
                <div className="quiz-header-content">
                    <div className="breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span>›</span>
                        <Link to="/topic">Chủ đề</Link>
                        <span>›</span>
                        <span className="current">{dataTopic.name}</span>
                    </div>
                    
                    <div className="quiz-info">
                        <div className="quiz-title">
                            <h1>Bài kiểm tra: {dataTopic.name}</h1>
                            <span className="quiz-badge">{dataQuestions.length} câu hỏi</span>
                        </div>
                        
                        <div className="quiz-stats">
                            <div className="stat-item">
                                <span className="stat-icon">✅</span>
                                <span className="stat-text">
                                    {getAnsweredCount()}/{dataQuestions.length} đã trả lời
                                </span>
                            </div>
                            <div className="stat-item timer">
                                <span className="stat-icon">⏱️</span>
                                <span className="stat-text time">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="progress-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{width: `${progressPercentage}%`}}
                            ></div>
                        </div>
                        <span className="progress-text">
                            {Math.round(progressPercentage)}% hoàn thành
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="quiz-content">
                <div className="quiz-layout">
                    {/* Question Section */}
                    <div className="question-section">
                        <div className="question-card">
                            <div className="question-header">
                                <span className="question-number">
                                    Câu hỏi {currentQuestion + 1}/{dataQuestions.length}
                                </span>
                                <div className="question-nav-dots">
                                    {dataQuestions.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`nav-dot ${index === currentQuestion ? 'active' : ''} ${selectedAnswers[dataQuestions[index].id] !== undefined ? 'answered' : ''}`}
                                            onClick={() => setCurrentQuestion(index)}
                                            title={`Câu ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="question-content">
                                <h2 className="question-text">{currentQ.question}</h2>
                                
                                <div className="answers-list">
                                    {currentQ.answers.map((answer, index) => {
                                        const isSelected = selectedAnswers[currentQ.id] === index;
                                        const optionLabel = String.fromCharCode(65 + index);
                                        
                                        return (
                                            <label 
                                                key={index}
                                                className={`answer-option ${isSelected ? 'selected' : ''}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${currentQ.id}`}
                                                    value={index}
                                                    checked={isSelected}
                                                    onChange={() => handleAnswerSelect(currentQ.id, index)}
                                                />
                                                <span className="option-label">{optionLabel}</span>
                                                <span className="option-text">{answer}</span>
                                                <span className="checkmark">✓</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="question-footer">
                                <button 
                                    className="btn btn-prev"
                                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                    disabled={currentQuestion === 0}
                                >
                                    ← Câu trước
                                </button>
                                
                                {currentQuestion === dataQuestions.length - 1 ? (
                                    <button 
                                        className="btn btn-submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài'}
                                    </button>
                                ) : (
                                    <button 
                                        className="btn btn-next"
                                        onClick={() => setCurrentQuestion(prev => Math.min(dataQuestions.length - 1, prev + 1))}
                                    >
                                        Câu tiếp theo →
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Tips Card */}
                        <div className="tips-card">
                            <div className="tips-icon">💡</div>
                            <div className="tips-content">
                                <h3>Mẹo nhỏ</h3>
                                <ul>
                                    <li>Đọc kỹ câu hỏi trước khi chọn đáp án</li>
                                    <li>Bạn có thể quay lại câu trước bất cứ lúc nào</li>
                                    <li>Đảm bảo trả lời tất cả câu hỏi trước khi nộp bài</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Question Grid */}
                    <div className="sidebar-section">
                        <div className="question-grid-card">
                            <h3 className="grid-title">Tổng quan bài thi</h3>
                            
                            <div className="question-grid">
                                {dataQuestions.map((question, index) => {
                                    const isAnswered = selectedAnswers[question.id] !== undefined;
                                    const isCurrent = index === currentQuestion;
                                    
                                    return (
                                        <button
                                            key={question.id}
                                            className={`grid-item ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                                            onClick={() => setCurrentQuestion(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="grid-legend">
                                <div className="legend-item">
                                    <span className="legend-box current"></span>
                                    <span>Đang làm</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-box answered"></span>
                                    <span>Đã trả lời</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-box"></span>
                                    <span>Chưa làm</span>
                                </div>
                            </div>

                            <button 
                                className="btn btn-submit-final"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Đang nộp bài...
                                    </>
                                ) : (
                                    <>
                                        <span>📤</span>
                                        Nộp bài ({getAnsweredCount()}/{dataQuestions.length})
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;