
import { parseCookies } from 'nookies';
import { api, getAllUsersData, userProfileData } from '../../services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData:any = createAsyncThunk('fetchUserData', async () => {
    const res = await userProfileData.get();
    return res;
});

export const fetchAllUserData:any = createAsyncThunk('fetchAllUserData', async () => {
    const res = await getAllUsersData.get();
    return res.data;
})

export const deleteUserData:any = createAsyncThunk('deleteUserData', async (id:string) => {
    const {'mk-delivery.token': token} = parseCookies();
        const res = await api.delete(`/user/profile/${id}`, {
            headers: {
                'auth-token': token
            }
        })
        return res.data
})

const userSlice = createSlice({
    name:'user',
    initialState:{user: [], allUser: [], isLoading:false, isError: false},
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder:any) => {
        builder.addCase(fetchUserData.pending, (state:any, action:any) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserData.fulfilled, (state:any, action:any) => {
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUserData.rejected, (state:any, action:any) => {
            console.log('Error', action.payload);
            state.isError = true;
        });

        //

        builder.addCase(fetchAllUserData.pending, (state:any, action:any) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllUserData.fulfilled, (state:any, action:any) => {
            state.isLoading = false;
            state.allUser = action.payload;
        });
        builder.addCase(fetchAllUserData.rejected, (state:any, action:any) => {
            console.log('Error', action.payload);
            state.isError = true;
        });

        //

        builder.addCase(deleteUserData.pending, (state: any, action: any) => {
            state.isLoading = true;
            state.isError = false; // Reinicie o isError
        });
        
        builder.addCase(deleteUserData.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.allUser = action.payload;
        });
        
        builder.addCase(deleteUserData.rejected, (state: any, action: any) => {
            console.log('Error', action.payload);
            state.isLoading = false;
            state.isError = true;
        });
        
    },
});

export const { setUser } = userSlice.actions;

export default userSlice;