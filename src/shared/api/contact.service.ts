// src/shared/api/contact.service.ts
import { api } from './api.config';

export const contactService = {
    async sendContactRequest(email: string, initialMessage?: string): Promise<void> {
        console.log({ email, initialMessage })
        await api.post('/contacts', { email, initialMessage });
    },
};