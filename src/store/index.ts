import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/auth';
import userSlice from './user/user';
import productsSlice from './products/product';
import cartSlice from './cart/cart';
import favoritesSlice from './favorites/favorites';

const persistConfig = {
    key: 'cart',
    storage
};

const persistsReducer = persistReducer(persistConfig, cartSlice.reducer);
const persistsFavorites = persistReducer(persistConfig, favoritesSlice.reducer);

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        userData:userSlice.reducer,
        productsData:productsSlice.reducer,
        cartData: persistsReducer,
        favoritesData: persistsFavorites,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export {persistor};

export default store;