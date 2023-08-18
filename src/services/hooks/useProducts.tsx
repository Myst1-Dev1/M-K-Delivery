import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductsApi, api } from '../api';
import { Products } from '@/types/Product';
import { toast } from 'react-toastify';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

type ProductContextData = {
    products: Products[];
    setProducts:any;
    CreateProducts: (data:Products) => Promise<void>;
    UpdateProducts: (id:string, data:Products) => Promise<void>;
    DeleteProduct:(id:string) => Promise<void>;
}

type ProductsProviderProps = {
    children: ReactNode;
}

export const ProductContext = createContext<ProductContextData>(
    {} as ProductContextData
);

export function ProductsProvider({children}:ProductsProviderProps) {
    const [products, setProducts] = useState<Products[]>([]);

    const router = useRouter();

    async function GetProducts() {
        const res = await ProductsApi.get();
        setProducts(res.data);
    }

    async function CreateProducts(productsValue:Products) {
        try {
            // Precisamos pegar o token
            const {'mk-delivery.token': token} = parseCookies();
            console.log(token);

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
    
            const { product } = res.data;
    
            setProducts([
                ...products,
                product,
            ])   

            toast.success('Produto criado com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        } catch (error) {
            console.log(error);
            toast.error('Tivemos um erro', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }
    }

    async function UpdateProducts(id:string, productsValue:Products) {
        try {
            const {'mk-delivery.token': token} = parseCookies();

            const formData = new FormData();
            formData.append('name', productsValue.name);
            formData.append('details', productsValue.details);
            formData.append('price', productsValue.price.toString());
            formData.append('amount', productsValue.amount.toString());
            formData.append('type', productsValue.type);
            formData.append('image', productsValue.image);

            await api.put(`/products/${id}`, formData, {
                headers: {
                  'auth-token': token,
                },
              });

            //   const { product } = res.data;
    
            //   setProducts([
            //       ...products,
            //       product,
            //   ])
              
              toast.success('Produto atualizado com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
            
        } catch (error) {
            console.log(error);
            toast.error('Tivemos um erro', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }
    }

    async function DeleteProduct(id:string) {
        try {
            const {'mk-delivery.token': token} = parseCookies();
            const res = await api.delete(`/products/${id}`, {
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
            console.log(error);
            toast.error('Tivemos um erro', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }
    }

    useEffect(() => {
        GetProducts();
    }, [])

    return (
        <ProductContext.Provider value={{products, 
            setProducts 
            ,CreateProducts
            ,UpdateProducts 
            ,DeleteProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext);

    return context;
}