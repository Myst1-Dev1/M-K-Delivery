import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth';
import userSlice from './user/user';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userData:userSlice.reducer
    },
});

export default store;