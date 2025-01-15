import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSearchResult } from '../types';

interface FoundUsersState {
    users: UserSearchResult[];
}

const initialState: FoundUsersState = {
    users: []
};

export const foundUsersSlice = createSlice({
    name: 'foundUsers',
    initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<UserSearchResult[]>) => {
            state.users = action.payload;
        }
    }
});

export const { getUsers } = foundUsersSlice.actions;
export default foundUsersSlice.reducer;
