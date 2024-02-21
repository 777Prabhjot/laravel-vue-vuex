import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:8000/api';

const token = Cookies.get('token');

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getAllVlogsApi = async() => {
    const data = await axios.get(`${BASE_URL}/`);
    return data.data;
}


export const postAddVlogApi = async(vlog) => {
    const data = await axios.post(`${BASE_URL}/create`, vlog);
    return data.data;
}


export const deleteVlogApi = async(id) => {
    const data = await axios.delete(`${BASE_URL}/delete/${id}`);
    return data.data;
}

export const updateVlogApi = async({id, title, description, formData}) => {
    const vlogId = Number(id);

    const data = await axios.put(`${BASE_URL}/update/${vlogId}`, {title, description, formData});
    return data.data;
}

export const getUserInfoApi = async () => {
    const data = await axios.get(`${BASE_URL}/getUserInfo`);
    return data.data;
}