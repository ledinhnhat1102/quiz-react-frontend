import {get} from "../utils/request";
import {getCookie} from "../helpers/cookie";

// Lấy tất cả bài thi đã làm của user hiện tại
export const getAnswerByUserId = async() => {
    const userId = getCookie("id");
    if (!userId) {
        return [];
    }
    const result = await get(`answers?userId=${userId}`);
    return result;
};

// Lấy chi tiết 1 bài thi cụ thể theo ID
export const getAnswer = async (id) => {
    const result = await get(`answers/${id}`);
    return result;
};