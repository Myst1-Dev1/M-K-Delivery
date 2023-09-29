import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth';
import userSlice from './user/user';
import productsSlice from './products/product';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userData:userSlice.reducer,
        productsData:productsSlice.reducer,
    },
});

export default store;