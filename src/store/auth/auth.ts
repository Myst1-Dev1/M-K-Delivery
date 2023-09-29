import { UserApi } from '../../services/api';
import { createSlice } from '@reduxjs/toolkit';
import { parseCookies, setCookie } from 'nookies';
import { toast } from 'react-toastify';
  
type SignInData = {
    email:string;
    password:string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {user:null ,isAuthenticated: false},
    reducers: {
        createUser(state, action) {
            state.user = action.payload; 
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        isAuthenticated(state) {
            const { 'mk-delivery.token': tokenExists } = parseCookies();
            state.isAuthenticated = !!tokenExists;
        },
    }
});

export async function validateToken() {
        const { 'mk-delivery.token': tokenExists } = parseCookies();
        if(tokenExists) {
            const tk = {token: tokenExists};
            const userData = await UserApi.tokenVerify(tk);
            if(userData.data){
                console.log('Token validado com sucesso');
            }
        } else {
            console.log('O token não existe');
        }
}

export async function signIn({ email, password }: SignInData) {
    try {
        const res = await UserApi.login(email, password);

    if(res.status === 201) {
        const tokenGenerated = `${res.headers['auth-token']}`;
        setCookie(undefined, 'mk-delivery.token', tokenGenerated, {
            maxAge: 60 * 60 * 2 // 2 hours
        });
        
        await validateToken();
        toast.success('Login feito com sucesso', {
            position:toast.POSITION.TOP_RIGHT,
            theme:"colored"
        })
    }
     else {
        console.log('Erro no login');
    }
    } catch (error) {
        console.log(error);
    }
}

export const { isAuthenticated, createUser, logout } = authSlice.actions;

export default authSlice;