import {post} from "../utils/request";

export const createAnswer = async(options) => {
    // Tạo ID mới cho answer record
    const newId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Tạo object answer hoàn chỉnh với SCORE đã được tính từ Quiz page
    const answerData = {
        id: newId,
        userId: options.userId,
        topicId: options.topicId,
        answers: options.answers,
        score: options.score,  // ← Nhận score từ Quiz page
        totalQuestions: options.totalQuestions,
        createdAt: new Date().toISOString()
    };
    
    console.log('Creating answer with data:', answerData);
    
    const result = await post(`answers`, answerData);
    return result;
};

// Helper function to calculate score
function calculateScore(userAnswers, correctAnswers) {
    if (!correctAnswers || correctAnswers.length === 0) {
        return 0;
    }
    
    let correctCount = 0;
    userAnswers.forEach(userAnswer => {
        const correctAnswer = correctAnswers.find(ca => ca.questionId === userAnswer.questionId);
        if (correctAnswer && correctAnswer.answer === userAnswer.answer) {
            correctCount++;
        }
    });
    
    return correctCount;
}