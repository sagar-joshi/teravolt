import axios from 'axios';

export const ax = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5000/",
    withCredentials: true
});