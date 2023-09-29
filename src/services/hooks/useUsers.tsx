import { UserProfile } from '../../types/UserProfile';
import { useContext, createContext, useState, ReactNode, useEffect } from 'react';
import { api, getAllUsersData, userProfileData } from '../api';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AllUser } from '../../types/AllUser';
import { AuthContext } from '../../contexts/AuthContext';

type UserContextData = {
    user:UserProfile[];
    allUser:AllUser[];
    uploadUserData:(id:string, data:any) => void;
    deleteUserData:(id:string) => Promise<void>;
    isFetching:boolean;
}

type UserProviderProps = {
    children:ReactNode;
}

export const UserContext = createContext<UserContextData>(
    {} as UserContextData);

export function UserProvider({children}:UserProviderProps) {
    const [user, setUser] = useState<UserProfile[]>([]);
    const [allUser, setAllUser] = useState<AllUser[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    const { isAuthenticated } = useContext(AuthContext);

    const router = useRouter();

    async function getUserData() {
        // await userProfileData.get()
        // .then(res => {
        //     setUser(res);
        // })
        // .catch(err => {
        //     console.log('Erro ao consumir dados do usuário', err);
        // })
        // .finally(() => {
        //     setIsFetching(false);
        // });  

        try {
            if(router.isFallback) {
                return <div>Carregando...</div>
            } else {
                const res = await userProfileData.get();
                setUser(res);
            }
        } catch (error) {
            console.log('Erro ao consumir usuario', error);
        }
    }

    async function getAllUserData() {
        try {
            const res = await getAllUsersData.get();
            
            if(isAuthenticated) {
                console.log('error');
            } else {
                setAllUser(res.data);
            }
        } catch (error) {
            console.log(error);
        }
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
        <UserContext.Provider value={{user, allUser, isFetching ,uploadUserData, deleteUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    return context;
}