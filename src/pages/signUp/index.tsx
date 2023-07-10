import { PageBanner } from '@/components/pageBanner';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function signUp() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { signUp } = useContext(AuthContext);

    async function handleSignUp(data:any) {
        await signUp(data);
    }

    return (
        <>
            <PageBanner>Cadastro</PageBanner>

            <div>
                <div className={`d-flex gap-4 mt-5 mb-5 flex-column justify-content-center align-items-center ${styles.formContainer}`}>
                    <img src="/images/loginImage.png" alt="userImage" />
                    <form onSubmit={handleSubmit(handleSignUp)} className='d-flex flex-column gap-3'>
                        <div className={`d-flex gap-5 ${styles.inputContainer}`}>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label htmlFor="firstname">Nome</label>
                                <input
                                    {...register('firstname', {required:true})} 
                                    type="text" 
                                    placeholder='John' 
                                    id='firstname' 
                                />
                                {errors.firstname && <span className='text-danger'>Nome Inválido</span>}
                            </div>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label htmlFor="lastname">Sobrenome</label>
                                <input
                                    {...register('lastname', {required:true})} 
                                    type="text" 
                                    placeholder='Doe' 
                                    id='lastname' 
                                />
                                {errors.lastname && <span className='text-danger'>Sobrenome Inválido</span>}
                            </div>
                        </div>
                        <div className={`d-flex gap-5 ${styles.inputContainer}`}>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label htmlFor="email">Email</label>
                                <input
                                    {...register('email', {required:true})} 
                                    type="text" 
                                    placeholder='johndoe@gmail.com' 
                                    id='email' 
                                />
                                {errors.email && <span className='text-danger'>Email Inválido</span>}
                            </div>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label htmlFor="tel">Telefone</label>
                                <input
                                    {...register('tel', {required:true})} 
                                    type="number" 
                                    placeholder='55 (21) 4002 8922' 
                                    id='tel' 
                                />
                                {errors.tel && <span className='text-danger'>Telefone Inválido</span>}
                            </div>
                        </div>
                        <div className={`d-flex gap-5 ${styles.inputContainer}`}>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label htmlFor="password">Senha</label>
                                <input
                                    {...register('password', {required:true})} 
                                    type="password" 
                                    placeholder='*********' 
                                    id='password' 
                                />
                                {errors.password && <span className='text-danger'>Senha Inválida</span>}
                            </div>
                            <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                                <label htmlFor="repeatPassword">Repetir senha</label>
                                <input
                                    {...register('password', {required:true})} 
                                    type="password" 
                                    placeholder='*********' 
                                    id='repeatPassword' 
                                />
                                {errors.password && <span className='text-danger'>As senhas não são iguais</span>}
                            </div>
                        </div>
                        <p>Já possui uma conta? <br /> 
                        <Link href='/login' passHref><span className='fw-bold'>Entrar</span></Link>
                        </p>
                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}