import { UserProfile } from '../../types/UserProfile';
import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import { api, getAllUsersData, userProfileData } from '../api';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AllUser } from '../../types/AllUser';


type UserContextData = {
    user:UserProfile[];
    allUser:AllUser[];
    uploadUserData:(id:string, data:any) => void;
    deleteUserData:(id:string) => void;
}

type UserProviderProps = {
    children:ReactNode;
}

export const UserContext = createContext<UserContextData>(
    {} as UserContextData);

export function UserProvider({children}:UserProviderProps) {
    const [user, setUser] = useState<UserProfile[]>([]);
    const [allUser, setAllUser] = useState<AllUser[] | any>([]);

    const router = useRouter();

    async function getUserData() {
        const res = await userProfileData.get();
        setUser(res);
    }

    async function getAllUserData() {
        const res = await getAllUsersData.get();
        setAllUser(res.data);
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

            toast.success('Usuário atualizado com sucesso', {
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

    async function deleteUserData(id:string) {
        try {
            const {'mk-delivery.token': token} = parseCookies();
            const res = await api.delete(`/user/profile/${id}`, {
                headers: {
                    'auth-token': token
                }
            })

            router.reload();

            toast.success('usuário deletado com sucesso', {
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
    }, []);

    useEffect(() => {
        getAllUserData();
    }, []);

    return (
        <UserContext.Provider value={{user, allUser ,uploadUserData, deleteUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    return context;
}