import axios from "axios";

const Base = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost',
    responseType: "json",
    withCredentials: true,
    headers: {
        "content-type": "application/json",
        "accept": "application/json",
    },
});

export default Base;

export const baseWithFormData = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost',
    responseType: "json",
    withCredentials: true,
    headers: {
        "content-type": "multipart/form-data",
    },
});