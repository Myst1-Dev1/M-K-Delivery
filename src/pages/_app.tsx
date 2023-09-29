import { AppProps } from "next/app";
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import { Header } from "../components/Header";
import Modal from 'react-modal';
import { Footer } from "@/components/Footer";
import { Provider } from 'react-redux';
import store from "../store";
import { validateToken } from "../store/auth/auth";

Modal.setAppElement("#__next");

export default function MyApp({Component, pageProps}:AppProps) {
    const [loading , setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <>
            {loading ? (
                <div className="loadingBox"><img src="/images/loading.gif" alt="loading" /></div>
            ) : (
                <Provider store={store}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </Provider>
            )}
        </>
    )
}