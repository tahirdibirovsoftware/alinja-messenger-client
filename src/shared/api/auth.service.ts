// src/shared/api/auth.service.ts
import axios from 'axios';

// Define the API response type for registration
interface RegisterResponse {
    accessToken: string;
}

// Define the registration data type
interface RegisterData {
    email: string;
    password: string;
    username: string;
    publicKey: string;
}

// Create an axios instance with common configuration
const api = axios.create({
    baseURL: 'https://192.168.100.35:3000', // Change to your server IP
    headers: {
        'Content-Type': 'application/json',
        'x-device-id': Math.random().toString(36).substring(2) + Date.now().toString(36)
    },
    withCredentials: true
});

export const authService = {
    // Register a new user
    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>('/auth/register', data);
        return response.data;
    }
};