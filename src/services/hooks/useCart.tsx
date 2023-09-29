import { useContext, createContext, useState, ReactNode } from 'react';
import { ProductContext } from './useProducts';
import { CartProducts } from '../../types/CartProducts';
import { toast } from 'react-toastify';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext<CartContextData>(
    {} as CartContextData
);

type CartContextData = {
   cart:CartProducts[];
   setCart:any;
   openCart:boolean;
   setOpenCart:any;
   totalCart:number;
   handleAddToCart:(id:string) => void;
   handleRemoveToCart:(id:string) => void;
   handleReduceItems:(id:string) =>  void;
   handleCleanCart:() => void;
}

type CartProviderProps = {
    children:ReactNode;
}


export function CartProvider({children}:CartProviderProps) {
    const { products } = useContext(ProductContext);
    const [cart, setCart] = useState<CartProducts[]>([])
    const [openCart, setOpenCart] = useState(false);

    const totalCart = cart.reduce((total, current) => { 
        return total + (current.product.price * current.quantity);
    }, 0)

    // Add to Cart
    function handleAddToCart(id:string) {
        const productItem = products.find(product => product._id === id)

        //If product is in the cart
        const alreadyInCart = cart.find(
            (item) => item.product._id === id);
        
        if(alreadyInCart) {
            const newCart: CartProducts[] = cart.map((item) => {
                if(item.product._id === id) ({
                    ...item,
                    quantity:item.quantity++
                });
                return item;
            });
            setCart(newCart);
            return;
        }

        const cartItem: CartProducts = {
            product:productItem!,
            quantity:1
        }

        const newCart: CartProducts[] = [...cart, cartItem];
        setCart(newCart);
        setCookie(undefined, 'cart-token', JSON.stringify(newCart), {
            maxAge: 60 * 60 * 1 // 1 hour
        })
        
        toast.success("Item adicinado ao carrinho", {
            position:toast.POSITION.TOP_RIGHT
        })
    }

    // Remove to Cart

    function handleReduceItems(id:string) {
        const alreadyInCart = cart.find(
            (item) => item.product._id === id)

        if(alreadyInCart!.quantity > 1) {
            const newCart: CartProducts[] = cart.map((item) => {
                if(item.product._id === id) ({
                    ...item,
                    quantity:item.quantity--
                });
                return item;
            });
            setCart(newCart);
            return;
        }

        // if the is only one product with the id in the cart
        const newCart:CartProducts[] = cart.filter(item => item.product._id !== id);
        setCart(newCart);
    }

    function handleRemoveToCart(id:string) {
        const newCart:CartProducts[] = cart.filter(item => item.product._id !== id);
        setCookie(undefined, 'cart-token', JSON.stringify(newCart));
        setCart(newCart);
    }

    function handleCleanCart() {
        setCart([]);
        destroyCookie(null, 'cart-token');
    }

    return (
        <CartContext.Provider value={{
            cart,
            setCart, 
            openCart,
            setOpenCart,
            totalCart, 
            handleAddToCart, 
            handleRemoveToCart,
            handleReduceItems, 
            handleCleanCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);

    return context
}