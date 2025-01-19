import { configureStore } from '@reduxjs/toolkit';
import foundUsersReducer from '../../features/SearchUser/model/usersSlice';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import contactsReducer from '../../pages/Users/model/contactSlice';

export const store = configureStore({
    reducer: {
        foundUsers: foundUsersReducer,
        contacts: contactsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
