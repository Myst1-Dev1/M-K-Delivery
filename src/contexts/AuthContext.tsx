import { UserApi, api } from "../services/api";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

import Router, { useRouter } from 'next/router';
import { User } from "../types/User";
import { SignUpData } from "../types/SignUpData";

type SignInData = {
    email:string;
    password:string;
}

type AuthContextData = {
    isAuthenticated: boolean,
    signIn:(data: SignInData) => Promise<void>;
    signUp:(data:SignUpData) => Promise<void>;
    handleLogout:() => void;
    user:User | any;
}

type AuthProviderProps = {
    children:ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }:AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    const isAuthenticated = !!user;

    async function validateToken() {
        const { 'mk-delivery.token': tokenExists } = parseCookies();

        if(tokenExists) {
            const tk = {token: tokenExists};
            const userData = await UserApi.tokenVerify(tk);
            if(userData.data){
                setUser(userData.data);
                console.log('Token validado com sucesso');
            }
        }
    }

    async function signIn({ email, password }: SignInData) {
        try {
            const res = await UserApi.login(email, password);

        if(res.status === 201) {
            const tokenGenerated = `${res.headers['auth-token']}`;
            setCookie(undefined, 'mk-delivery.token', tokenGenerated, {
                maxAge: 60 * 60 * 2 // 2 hours
            });
            
            await validateToken();
            setUser(res.data);

            toast.success('Login feito com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:"colored"
            })
            Router.push('/');
        }
         else {
            console.log('Erro no login');
        }
        } catch (error) {
            console.log(error);
        }
    }

    async function signUp({firstname, lastname, email, tel, password, isAdmin = false}:SignUpData) {
        try {
            const res = await api.post('/register', {
              firstname,
              lastname,
              email,
              tel,
              password,
              isAdmin
            }, {
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            setUser(res.data);

            toast.success('Conta criada com sucesso', {
                position:toast.POSITION.TOP_CENTER
              })
            router.push('/login');
          } catch (error) {
            console.log(error);
            toast.error('Capturamos um erro', {
                position:toast.POSITION.TOP_CENTER
            })
          }
    }

    function handleLogout() {
        destroyCookie(null,'mk-delivery.token');
        setUser(null);

        Router.push('/login');
    }

    useEffect(() => {
        validateToken();
    },[]);

    return (
        <AuthContext.Provider value={{user ,isAuthenticated, signIn, signUp, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useLoggedUserData() {
    const context = useContext(AuthContext);

    return context;
}