import styles from './styles.module.scss';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PageBanner } from '../../components/pageBanner';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { signIn } from '../../store/auth/auth';

export default function Login() {
    const { register, handleSubmit, formState:{errors} } = useForm();

    const router = useRouter();

    async function handleSignIn(data:any) {
       await signIn(data);
       router.push('/');
    }

    useEffect(() => {
        const {'mk-delivery.token': hasToken} = parseCookies();
        if(hasToken) {
            router.push('/');
            router.reload();
        }
    }, [])

    return (
        <div className={styles.login}>
            <PageBanner>Login</PageBanner>

            <div className={`d-flex gap-4 mb-5 mt-5 flex-column justify-content-center align-items-center ${styles.formContainer}`}>
                <img src="/images/loginImage.png" alt="userImage" />
                <form onSubmit={handleSubmit(handleSignIn)} className='d-flex flex-column gap-3'>
                    <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                        <label htmlFor="email">Email</label>
                        <input
                            {...register('email', {required:true})} 
                            type="email" 
                            placeholder='johndoe@gmail.com' 
                            id='email' 
                        />
                        {errors.email && <span>Email inválido</span>}
                    </div>
                    <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                        <label htmlFor="password">Senha</label>
                        <input
                            {...register('password', {required:true})} 
                            type="password" 
                            placeholder='*********' 
                            id='password' 
                        />
                        {errors.password && <span>Senha inválida</span>}
                    </div>
                    <p>Não possui uma conta? <br /> 
                    <Link href='/signUp' passHref><span className='fw-bold'>Criar conta</span></Link>
                    </p>
                    <button type='submit'>Entrar</button>
                </form>
            </div>
        </div>
    )
}