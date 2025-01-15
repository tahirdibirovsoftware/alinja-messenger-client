// src/shared/api/user.service.ts

import { UserSearchResult } from '../types/user.types';
import { api } from './api.config';

export const userService = {
    async searchUsers(searchTerm: string): Promise<UserSearchResult[]> {
        const response = await api.get<UserSearchResult[]>('/users/search', {
            params: { query: searchTerm }
        });
        return response.data;
    }
};