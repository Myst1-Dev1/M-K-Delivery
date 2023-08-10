
import { createContext, useContext, ReactNode, useState } from 'react';
import { ProductContext } from './useProducts';
import { Favorites } from '../../types/Favorites';
import { destroyCookie, setCookie } from 'nookies';
import { toast } from 'react-toastify';

export const FavoritesContext = createContext<FavoritesContextData>(
    {} as FavoritesContextData);

type FavoritesContextData = {
    favorites: Favorites[];
    setFavorites:any;
    handleAddToFavorites:(id:string) => void;
    handleCleanFavorites:() => void;
    handleRemoveToFavorites:(id:string) => void;
}

type CartProviderProps = {
    children:ReactNode;
}

export function FavoritesProvider({children}:CartProviderProps) {
    const [favorites, setFavorites] = useState<Favorites[]>([]);
    const { products } = useContext(ProductContext);

    function handleAddToFavorites(id: string) {
        const productItem = products.find(product => product._id === id);

        const alreadyInFavorites = favorites.find(item => item.favorites._id === id);

        if (alreadyInFavorites) {
            const newFavorites: Favorites[] = favorites.map(item => {
                if (item.favorites._id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });

            setFavorites(newFavorites);
        } else {
            const cartItem: Favorites = {
                favorites: productItem!,
                quantity: 1
            };

            const newFavorites: Favorites[] = [...favorites, cartItem];
            setFavorites(newFavorites);
            setCookie(undefined, 'favorite-token', JSON.stringify(newFavorites), {
                maxAge: 365 * 24 * 60 * 60, // 1 ano em segundos
            });
        }

        toast.success('Item adicionado aos favoritos', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    function handleRemoveToFavorites(id:string) {
        const newFavorites:Favorites[] = favorites.filter(favorite => favorite.favorites._id === id);
        setCookie(undefined, 'favorite-token', JSON.stringify(newFavorites));
        setFavorites(newFavorites);

        toast.success('Item removido dos favoritos', {
            position:toast.POSITION.TOP_RIGHT
        })
    }

    function handleCleanFavorites() {
        setFavorites([]);
        destroyCookie(null, 'favorite-token');

        toast.success('Favoritos apagados com sucesso', {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    return (
        <FavoritesContext.Provider value={{
            favorites, 
            setFavorites,
            handleAddToFavorites, 
            handleCleanFavorites,
            handleRemoveToFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function UseFavorites() {
    const context = useContext(FavoritesContext);

    return context;
}