// src/shared/api/contact.service.ts
import { api } from './api.config';

export const contactService = {
    async sendContactRequest(userId: string): Promise<void> {
        await api.post(`/contacts/request/${userId}`);
    },

    async cancelContactRequest(userId: string): Promise<void> {
        await api.delete(`/contacts/request/${userId}`);
    }
};