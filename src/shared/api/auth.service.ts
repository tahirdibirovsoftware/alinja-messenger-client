// src/shared/api/auth.service.ts
import axios from 'axios';

// Response types
interface RegisterResponse {
    accessToken: string;
}

interface LoginResponse {
    accessToken: string;
}

interface UserResponse {
    id: string;
    email: string;
    username: string;
    isOnline: boolean;
    lastActive: Date;
}

// Request data types
interface RegisterData {
    email: string;
    password: string;
    username: string;
    publicKey: string;
}

interface LoginData {
    email: string;
    password: string;
}

// Create an axios instance with common configuration
const api = axios.create({
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

export const authService = {
    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    async login(data: LoginData): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    async logout(): Promise<void> {
        await api.post('/auth/logout');
        localStorage.removeItem('accessToken');
    },

    async getCurrentUser(): Promise<UserResponse> {
        const response = await api.get<UserResponse>('/auth/me');
        return response.data;
    }
};