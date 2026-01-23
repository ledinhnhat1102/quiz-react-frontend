import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";
import "./Quiz.scss";

function Quiz() {
    const params = useParams();
    const navigate = useNavigate();

    const [dataTopic, setDataTopic] = useState(null);
    const [dataQuestions, setDataQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        const fetchTopic = async () => {
            const res = await getTopic(params.id);
            setDataTopic(res);
        };
        fetchTopic();
    }, [params.id]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await getListQuestion(params.id);
            setDataQuestions(res);
        };
        fetchQuestions();
    }, [params.id]);

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (Object.keys(selectedAnswers).length < dataQuestions.length) {
        const ok = window.confirm(
            `Bạn mới trả lời ${Object.keys(selectedAnswers).length}/${dataQuestions.length} câu. Bạn chắc chắn muốn nộp bài?`
        );
        if (!ok) return;
    }

    setIsSubmitting(true);

    let correctCount = 0;

    const answers = dataQuestions.map(q => {
        const userAnswer = selectedAnswers[q.id];

        if (userAnswer === q.correctAnswer) {
            correctCount++;
        }

        return {
            questionId: Number(q.id),
            answer: userAnswer !== undefined ? userAnswer : -1
        };
    });

    const payload = {
        userId: Number(getCookie("id")),
        topicId: Number(params.id),
        answers,
        score: correctCount,
        totalQuestions: dataQuestions.length,
        createdAt: new Date().toISOString()
    };

    try {
        const res = await createAnswer(payload);
        navigate(`/result/${res.id}`);
    } catch (err) {
        console.error(err);
        alert("Có lỗi khi nộp bài");
        setIsSubmitting(false);
    }
};


    /* ================= TIMER ================= */
    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit(null, true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, handleSubmit]);

    /* ================= HELPERS ================= */
    const formatTime = seconds => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleAnswerSelect = (qid, index) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [qid]: index
        }));
    };

    const answeredCount = Object.keys(selectedAnswers).length;
    const progress = dataQuestions.length
        ? (answeredCount / dataQuestions.length) * 100
        : 0;

    if (!dataTopic || dataQuestions.length === 0) {
        return (
            <div className="quiz-loading">
                <div className="spinner"></div>
                <p>Đang tải bài kiểm tra...</p>
            </div>
        );
    }

    const currentQ = dataQuestions[currentQuestion];

    /* ================= RENDER ================= */
    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div className="breadcrumb">
                    <Link to="/">Trang chủ</Link> ›
                    <Link to="/topic"> Chủ đề</Link> ›
                    <span>{dataTopic.name}</span>
                </div>

                <div className="quiz-info">
                    <h1>{dataTopic.name}</h1>
                    <div>
                        {answeredCount}/{dataQuestions.length} câu | ⏱ {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="quiz-content">
                <h2>
                    Câu {currentQuestion + 1}/{dataQuestions.length}
                </h2>
                <p>{currentQ.question}</p>

                {currentQ.answers.map((ans, i) => (
                    <label key={i} className="answer-option">
                        <input
                            type="radio"
                            checked={selectedAnswers[currentQ.id] === i}
                            onChange={() => handleAnswerSelect(currentQ.id, i)}
                        />
                        {ans}
                    </label>
                ))}

                <div className="quiz-actions">
                    <button
                        disabled={currentQuestion === 0}
                        onClick={() => setCurrentQuestion(q => q - 1)}
                    >
                        ← Trước
                    </button>

                    {currentQuestion === dataQuestions.length - 1 ? (
                        <button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Đang nộp..." : "Nộp bài"}
                        </button>
                    ) : (
                        <button onClick={() => setCurrentQuestion(q => q + 1)}>
                            Tiếp →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
