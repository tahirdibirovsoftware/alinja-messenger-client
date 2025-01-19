/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contactService } from '../../../shared/api/contact.service';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const contacts = await contactService.getContacts();
    // Map API response to match the expected state structure
    return contacts.map((contact: any) => ({
        userId: contact.userId || contact.id, // Ensure correct mapping
        contactId: contact.contactId,
    }));
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [] as { userId: string; contactId: string }[],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contacts = action.payload; // Set transformed data
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default contactsSlice.reducer;
