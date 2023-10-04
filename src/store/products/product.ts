import { ProductsApi, api } from '../../services/api';
import { Products } from '../../types/Product';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

export const fetchProductsData:any = createAsyncThunk('fetchProductsData', async () => {
    const res = await ProductsApi.get();
    return res.data;
});

export const createProducts:any = createAsyncThunk('createProducts', async (productsValue:Products) => {
    try {
        const {'mk-delivery.token': token} = parseCookies();

        const formData = new FormData();
        formData.append('name', productsValue.name);
        formData.append('details', productsValue.details);
        formData.append('price', productsValue.price.toString());
        formData.append('amount', productsValue.amount.toString());
        formData.append('type', productsValue.type);
        formData.append('image', productsValue.image);

        const res = await api.post('/products/create', formData, {
            headers: {
              'auth-token': token,
            },
          });

          toast.success('Produto criado com sucesso', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        });

        return res.data;  

    } catch (error) {
        console.log(error);
        toast.error('Tivemos um erro', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        });
    }
});

export const deleteProducts:any = createAsyncThunk('deleteProducts', async (id:string) => {
    try {
        const {'mk-delivery.token': token} = parseCookies();
        const res = await api.delete(`/products/${id}`, {
            headers: {
                'auth-token': token
            }
        })

        toast.success('Produto deletado com sucesso', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })

        return res.data;
    } catch (error) {
        console.log(error);
        toast.error('Tivemos um erro', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState: {products: [], isLoading:false, isError: false},
    reducers: {},
    extraReducers: (builder:any) => {

        // Fetch Products

        builder.addCase(fetchProductsData.pending, (state:any, action:any) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductsData.fulfilled, (state:any, action:any) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProductsData.rejected, (state:any, action:any) => {
            console.log('Error', action.payload);
            state.isError = true;
        });

        // Create new product

        builder.addCase(createProducts.pending, (state:any, action:any) => {
            state.isLoading = true;
        });
        builder.addCase(createProducts.fulfilled, (state:any, action:any) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(createProducts.rejected, (state:any, action:any) => {
            console.log('Error', action.payload);
            state.isError = true;
        });

        // delete products

        builder.addCase(deleteProducts.fulfilled, (state:any, action:any) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(deleteProducts.rejected, (state:any, action:any) => {
            console.log('Error', action.payload);
            state.isError = true;
        });
        
    }
})

export default productsSlice;