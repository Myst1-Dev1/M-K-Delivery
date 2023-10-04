import { PageBanner } from '../components/pageBanner';
import styles from './styles.module.scss';
import Link from 'next/link';

export default function Page404() {
    return (
        <>
            <PageBanner>404</PageBanner>

            <div className={`container d-flex justify-content-center align-items-center flex-column gap-3 
                ${styles.pageContainer}`}>
                <img src="/images/404Image.png" alt="not-authorized-image" />
                <h4 className='fw-bold'>Parece que você se perdeu</h4>
                <Link href="/"><button>Voltar para o início</button></Link>
            </div>
        </>
    )
}