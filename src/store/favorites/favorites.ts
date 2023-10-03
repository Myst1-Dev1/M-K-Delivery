import { createSlice } from '@reduxjs/toolkit';

interface Favorites {
    _id:string;
    image:string;
    name:string;
    details:string;
    price:number;
    amount:number;
    quantity:number;
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {favorites: [] as Favorites[]},
    reducers: {
        addToFavorites(state, action) {
            const newItem = action.payload;
            const existingItem = state.favorites.find(item => item._id === newItem.id);
            if(!existingItem) {
                state.favorites.push({
                    _id: newItem.id,
                    image: newItem.image,
                    name: newItem.name,
                    details: newItem.details,
                    price: newItem.price,
                    amount: newItem.amount,
                    quantity: 1,
                })
            } else {
                console.log('Erro');
            }
        },
        removeToFavorites(state, action) {
            const favoriteIdToRemove = action.payload;
            const newFavorites = state.favorites.filter(
                (item) => item._id !== favoriteIdToRemove
            );

            return { ...state, favorites: newFavorites };
        },
        cleanFavorites(state) {
            state.favorites = [];
        }
    }
});

export const { addToFavorites, removeToFavorites, cleanFavorites } = favoritesSlice.actions;

export default favoritesSlice;