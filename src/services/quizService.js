import { post } from "../utils/request";

export const createAnswer = async (options) => {
    // Tạo ID mới cho answer record
    const newId = Date.now().toString(36) + Math.random().toString(36).substr(2);

    // Dữ liệu answer (score đã được tính từ Quiz page)
    const answerData = {
        id: newId,
        userId: options.userId,
        topicId: options.topicId,
        answers: options.answers,
        score: options.score,
        totalQuestions: options.totalQuestions,
        createdAt: new Date().toISOString()
    };

    console.log("Creating answer with data:", answerData);

    const result = await post("answers", answerData);
    return result;
};
