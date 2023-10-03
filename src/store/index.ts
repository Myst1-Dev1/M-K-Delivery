import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/auth';
import userSlice from './user/user';
import productsSlice from './products/product';
import cartSlice from './cart/cart';

const persistConfig = {
    key: 'cart',
    storage
};

const persistsReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userData:userSlice.reducer,
        productsData:productsSlice.reducer,
        cartData: persistsReducer,
    },
});

const persistor = persistStore(store);
export {persistor};

export default store;