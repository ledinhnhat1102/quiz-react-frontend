// const API_DOMAIN = "http://localhost:3002/";
const API_DOMAIN = "https://quiz-json-server-api.onrender.com/api";

const buildUrl = (path) => `${API_DOMAIN}/${path}`;

export const get = async (path) => {
    const response = await fetch(buildUrl(path));
    if (!response.ok) {
        throw new Error("GET request failed");
    }
    return response.json();
};

export const post = async (path, options) => {
    const response = await fetch(buildUrl(path), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });

    if (!response.ok) {
        throw new Error("POST request failed");
    }
    return response.json();
};

export const del = async (path) => {
    const response = await fetch(buildUrl(path), {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("DELETE request failed");
    }
    return response.json();
};

export const patch = async (path, options) => {
    const response = await fetch(buildUrl(path), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });

    if (!response.ok) {
        throw new Error("PATCH request failed");
    }
    return response.json();
};