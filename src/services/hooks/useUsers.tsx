import { UserProfile } from '../../types/UserProfile';
import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import { api, userProfileData } from '../api';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


type UserContextData = {
    user:UserProfile[];
    uploadUserData:(id:string, data:any) => void;
}

type UserProviderProps = {
    children:ReactNode;
}

export const UserContext = createContext<UserContextData>(
    {} as UserContextData);

export function UserProvider({children}:UserProviderProps) {
    const [user, setUser] = useState<UserProfile[]>([]);

    const router = useRouter();

    async function getUserData() {
        const res = await userProfileData.get();
        setUser(res);
    }

    async function uploadUserData(id:string, data:any) {
        try {
            const {'mk-delivery.token': token} = parseCookies();
            const res = await api.put(`user/profile/${id}`,data, {
                headers: {
                    'auth-token': token
                }
            })

            router.reload();

            toast.success('Produto deletado com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })

            return res.data;
        } catch (error) {
            console.log('Temos um erro', error);
            toast.error('Tivemos um erro', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <UserContext.Provider value={{user, uploadUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    return context;
}