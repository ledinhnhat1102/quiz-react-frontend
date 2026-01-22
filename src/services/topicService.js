import {get} from "../utils/request";

export const getListTopic = async(email, password) => {
    const result = await get(`topics`);
    return result;
};

export const getTopic = async(id) => {
    const result = await get(`topics/${id}`);
    return result;
};