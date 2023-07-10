import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './styles.module.scss';

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className='d-flex wrap justify-content-between container mb-5'>
                <div className={`${styles.footerBox}`}>
                    <h4 className='fw-bold mb-3'>Categórias</h4>
                    <h5 className='fw-bold'>Sushi</h5>
                    <h5 className='fw-bold'>Macarrão</h5>
                    <h5 className='fw-bold'>Carne</h5>
                    <h5 className='fw-bold'>Brasileira</h5>
                    <h5 className='fw-bold'>Salada</h5>
                    <h5 className='fw-bold'>Sobremesa</h5>
                </div>
                <div className={`${styles.footerBox}`}>
                    <h4 className='fw-bold mb-3'>Serviços</h4>
                    <h5 className='fw-bold'>Sobre</h5>
                    <h5 className='fw-bold'>Faq</h5>
                    <h5 className='fw-bold'>Contato</h5>
                    <h5 className='fw-bold'>Notícias</h5>
                    <h5 className='fw-bold'>Localização</h5>
                </div>
                <div className={`${styles.footerBox}`}>
                    <h4 className='fw-bold mb-3'>Termos de Privacidade</h4>
                    <h5 className='fw-bold'>Política de pagamento</h5>
                    <h5 className='fw-bold'>Política de privacidade</h5>
                    <h5 className='fw-bold'>Política de devolução</h5>
                    <h5 className='fw-bold'>Política de envio</h5>
                    <h5 className='fw-bold'>Termos e condições</h5>
                </div>
                <div className={`${styles.footerBox}`}>
                    <h4 className='fw-bold mb-3'>Conta</h4>
                    <h5 className='fw-bold'>Minha conta</h5>
                    <h5 className='fw-bold'>Meu carrinho</h5>
                    <h5 className='fw-bold'>Histórico de pedidos</h5>
                    <h5 className='fw-bold'>Lista de desejos</h5>
                    <h5 className='fw-bold'>Endereços</h5>
                </div>
            </div>


        <div className={`d-flex justify-content-between align-items-center px-5 wrap ${styles.copyright}`}>
            <p className='fw-bold'>© 2023 Todos os direitos reservados <br /> Feito com ❤️ por Myst1 Dev</p>
            <img src="/images/Logo.png" alt="logo" />
            <div className={`d-flex align-items-center gap-4 ${styles.socialIcons}`}>
                <div className={`d-flex justify-content-center align-items-center ${styles.socialIconBox}`}>
                    <FaFacebookF className={styles.icon} />
                </div>
                <div className={`d-flex justify-content-center align-items-center ${styles.socialIconBox}`}>
                    <FaInstagram className={styles.icon} />
                </div>
                <div className={`d-flex justify-content-center align-items-center ${styles.socialIconBox}`}>
                    <FaTwitter className={styles.icon} />
                </div>
            </div>
        </div>
        </div>
    )
}