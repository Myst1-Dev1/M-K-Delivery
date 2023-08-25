import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface PageBannerProps {
    children:ReactNode;
}

export function PageBanner({ children }:PageBannerProps) {
    return (
        <div className={`d-flex justify-content-center align-items-center mb-5 ${styles.pageBanner}`}>
            <h1 data-testid="h1" className='fw-bold'>{children}</h1>
        </div>
    )
}