import { createSlice } from '@reduxjs/toolkit';

const dataLoginSlice = createSlice({
    name: 'theme',
    initialState: {
        isLogin: false,
        displayName: null,
        photoURL: null,
        id: null,
        email: null,
    },
    reducers: {
        login: (state, action) => {
            return { ...action.payload };
        },
        logout: (state, action) => {
            return {
                isLogin: false,
                displayName: null,
                photoURL: null,
                id: null,
                email: null,
            };
        },
    },
});

export const { actions: loginAction, reducer: loginReducer } = dataLoginSlice;
