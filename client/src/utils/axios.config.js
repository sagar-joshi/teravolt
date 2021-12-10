import axios from 'axios';

export const ax = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});