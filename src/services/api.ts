import axios from 'axios';
import { parseCookies } from 'nookies';

export const api = axios.create({
    baseURL:'http://localhost:8888/api',
})

export const ProductsApi = {

    get: async () => {

        try {

            const { data, status } = await api.get('/products');

            if(status === 200) return data;

        } catch (error) {
            console.log(error);
        }

    }

}

const {'mk-delivery.token': token} = parseCookies();

export const UserApi = {

    tokenVerify: async (token: object) => {
        const res = await api.post('/tokenVerify', token)
        return res;
    },

    login: async ( email: string, password: string ) => {
        const res = await api.post('/login', { email, password });
        return res;
    },

    // profile: async () => {
    //     try {
    //         const {data, status} = await api.get('/user/profile', {
    //             headers: {
    //                 'auth-token':token
    //             },
    //         })
    //         if(status === 201) return data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
}

export const userProfileData = {
    get: async() => {
        try {
            const {data, status} = await api.get('user/profile', {
                headers: {
                    'auth-token':token
                }
            })
            if(status === 201) return data;
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllUsersData = {
    get: async () => {
        try {
            const {data, status} = await api.get('/users', {
                headers: {
                    'auth-token': token
                }
            })
            if(status === 200) return data;
        } catch (error) {
            console.log(error);
        }
    }
}