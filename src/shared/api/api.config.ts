import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://192.168.100.35:3000',
    headers: {
        'Content-Type': 'application/json',
        'x-device-id': Math.random().toString(36).substring(2) + Date.now().toString(36)
    },
    withCredentials: true
});

// Add auth token to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});