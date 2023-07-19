import { PageBanner } from '@/components/pageBanner';
import styles from './styles.module.scss';

export default function Contact() {
    return (
        <>
            <PageBanner>Contato</PageBanner>

            <div className={`container py-5 ${styles.formContainer}`}>
                <div className='row'>
                    <div className='col-md-6'>
                        <h2 className='fw-bold'>Nos envie <br /> uma mensagem</h2>
                        <form className='mt-5' action="">
                            <div className='row'>
                                <div className={`col-md-6 ${styles.inputBox}`}>
                                    <input type="text" placeholder='Nome'/>
                                </div>
                                <div className={`col-md-6 ${styles.inputBox}`}>
                                    <input type="email" placeholder='Email'/>
                                </div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder='Assunto'/>
                            </div>
                            <textarea placeholder='Mensagem'></textarea>
                            <button className='mb-5'>Enviar</button>
                        </form>
                    </div>
                    <img className='img-fluid col-md-6' src="/images/contactImage.png" alt="contact image" />
                </div>
            </div>
        </>
    )
}