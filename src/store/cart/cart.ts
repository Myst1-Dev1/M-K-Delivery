import { createSlice } from '@reduxjs/toolkit';

interface CartProducts {
    _id:string;
    image:string;
    name:string;
    price:number;
    amount:number;
    quantity:number;
    totalCart:number;
}

const cartSlice = createSlice({
    name:'cart',
    initialState: {cart: [] as CartProducts[], openCart: false, totalPrice: 0},
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cart.find(item => item._id === newItem.id);
            if(!existingItem) {
                state.cart.push({
                    _id: newItem.id,
                    image: newItem.image,
                    name: newItem.name,
                    price: newItem.price,
                    amount: newItem.amount,
                    quantity: 1,
                    totalCart: newItem.price
                })
            } else {
                existingItem.totalCart = existingItem.totalCart + newItem.price;
            }
        },

        reduceItemsInCart(state, action) {
            const productIdToReduce = action.payload;
            const existingCartItem = state.cart.find(
                (item) => item._id === productIdToReduce
            );

            if (existingCartItem && existingCartItem.quantity > 1) {
                const newCart = state.cart.map((item) => {
                if (item._id === productIdToReduce) {
                    return {
                    ...item,
                    quantity: item.quantity - 1,
                    };
                }
                return item;
                });

                return { ...state, cart: newCart };
            } else {
                const newCart = state.cart.filter(
                (item) => item._id !== productIdToReduce
                );

                return { ...state, cart: newCart };
            }
        },

        removeToCart(state, action) {
            const productIdToRemove = action.payload;
            const newCart = state.cart.filter(
                (item) => item._id !== productIdToRemove
            );

            return { ...state, cart: newCart };
        },

        cleanCart(state) {
            state.cart = [];
        },

        totalCart(state) {
            state.totalPrice = state.cart.reduce((total, current) => {
                return total + current.price * current.quantity;
            }, 0);
        },

        openCart(state) {
            state.openCart = true;
        },

        closeCart(state) {
            state.openCart = false;
        }
    }
});

export const { addToCart, 
               openCart, 
               closeCart, 
               totalCart, 
               removeToCart,
               cleanCart,
               reduceItemsInCart } = cartSlice.actions;

export default cartSlice;