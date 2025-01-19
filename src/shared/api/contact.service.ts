/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from './api.config';

export const contactService = {
    async sendContactRequest(email: string, initialMessage?: string): Promise<void> {
        console.log({ email, initialMessage });
        await api.post('/contacts', { email, initialMessage });
    },

    async getContacts(): Promise<any[]> {
        const response = await api.get('/contacts');
        return response.data; // Assuming the backend sends userId and contactId
    },
};
