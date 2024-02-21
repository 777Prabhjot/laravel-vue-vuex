import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api';


export const loginApi = async (userInfo) => {
    const data = await axios.post(`${BASE_URL}/login`, userInfo);
    return data.data;
}

export const registerApi = async (userInfo) => {
    const data = await axios.post(`${BASE_URL}/register`, userInfo);
    return data.data;
}