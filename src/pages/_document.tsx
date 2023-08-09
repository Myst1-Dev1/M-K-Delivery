import Document, { Head, Html, Main, NextScript } from "next/document";
import Modal from 'react-modal';

export default class MyDocument extends Document {
    // componentDidMount() {
    //     // Defina o elemento raiz do aplicativo
    //     Modal.setAppElement('#__next'); // O seletor aqui deve ser o seletor do elemento raiz do seu aplicativo
    //   }

    render() {
        return (
            <Html>
                <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto&family=Ultra&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}