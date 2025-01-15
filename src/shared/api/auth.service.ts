// src/shared/api/auth.service.ts
import { api } from './api.config';

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