import { AppProps } from "next/app";
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import { Header } from "../components/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductsProvider } from "@/services/hooks/useProducts";
import { CartProvider } from "@/services/hooks/useCart";
import Modal from 'react-modal';
import { Footer } from "@/components/Footer";
import { UserProvider } from "@/services/hooks/useUsers";

Modal.setAppElement("#__next");

export default function MyApp({Component, pageProps}:AppProps) {
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

    return (
       <>
            {loading ? <div className="loadingBox"><img src="/images/loading.gif" alt="loading" /></div>
            :
            <AuthProvider>
                <ProductsProvider>
                    <CartProvider>
                        <UserProvider>
                            <Header />
                            <Component {...pageProps} />
                            <Footer />
                        </UserProvider>
                    </CartProvider>
                </ProductsProvider>
            </AuthProvider>
            }
       </>
      
    )
}