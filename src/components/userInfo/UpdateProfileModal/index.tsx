import { FaTimes } from 'react-icons/fa';
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';
import { api } from '../../../services/api';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface UpdateProfileModalProps {
    onUser:any;
    userId:string;
    isOpen:boolean;
    onRequestClose:any;
}

export function UpdateProfileModal({userId ,isOpen, onRequestClose, onUser } :UpdateProfileModalProps) {
    const { register, handleSubmit, formState:{errors}, setValue } = useForm();
    const router = useRouter();

    //const { uploadUserData } = useContext(UserContext);

    async function handleUpdateUserData(data:any) {
        try {
            const {'mk-delivery.token': token} = parseCookies();

            console.log('sexo',data.image);

            const formData = new FormData();

            formData.append('firstname', data.firstname);
            formData.append('lastname', data.lastname);
            formData.append('password', data.password);
            formData.append('tel', data.tel);
            //if(data.image) formData.append('image', data.image);
            //formData.append('image', data.image);

            if (data.image) {
                formData.append('image', data.image);
            }

            const userUpdated = formData;

            await api.put(`user/profile/${userId}`, userUpdated, {
                headers: {
                    'auth-token': token,
                },
            });
    
            //router.reload();
    
            toast.success('Dados do usuário atualizados com sucesso', {
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
            });
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            toast.error('Tivemos um erro', {
                position: toast.POSITION.TOP_RIGHT,
                theme: 'colored',
            });
        }
    }

    return (
        <>
        <Modal
            ariaHideApp={false}
            isOpen = {isOpen}
            onRequestClose={onRequestClose}
            overlayClassName = "react-modal-overlay"
            className= "react-modal-content"
            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.4)'
                },
                content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  border: '1px solid #ccc',
                  background: '#fff',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '10px',
                  outline: 'none',
                  padding: '20px',
                }
              }}
        >
            <div className={styles.modalContainer}>
              <div className='d-flex justify-content-between'>
                <h2 className='text-center'>Atualizar dados de usuário</h2>
                <FaTimes onClick={onRequestClose} className={styles.icon} />
              </div>
              <form 
                    onSubmit={handleSubmit(handleUpdateUserData)} 
                    className={styles.updateProfileForm}
                    encType="multipart/form-data"
                >
                <div className='d-flex justify-content-between mt-3'>
                    <div className={`d-flex flex-column gap-2 ${styles.InputBox}`}>
                        <img className='mb-2' src='/images/userImage.png' 
                            alt="user-updated-image" />
                        <label className={`fw-bold ${styles.sendImage}`} htmlFor="file">Enviar Imagem</label>
                        <input 
                            type="file"
                            id='file' 
                            {...register('image', {required:false})}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setValue('image', file);
                            }}
                        />
                    </div>
                    <div className={`d-flex flex-column gap-2 ${styles.InputBox}`}>
                        <label className='fw-bold' htmlFor="name">Nome</label>
                        <input 
                            type="text" 
                            id='name' 
                            placeholder='John'
                            {...register('firstname', {required:false})}  
                        />
                    </div>
                </div>
                
                    <div className={`d-flex flex-column gap-2 mt-3 ${styles.InputBox}`}>
                        <label className='fw-bold' htmlFor="lastName">Último Nome</label>
                        <input 
                            type="text" 
                            id='lastName' 
                            placeholder='Doe'
                            {...register('lastname', {required:false})}
                        />
                    </div>
              
                <div className='d-flex justify-content-between mt-3'>
                <div className={`d-flex flex-column gap-2 mt-3 ${styles.InputBox}`}>
                        <label className='fw-bold' htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            id='password' 
                            placeholder='********'
                            {...register('password', {required:false})}  
                        />
                    </div>
                    <div className={`d-flex flex-column gap-2 mt-3 ${styles.InputBox}`}>
                        <label className='fw-bold' htmlFor="phone">Telefone</label>
                        <input 
                            type="tel" 
                            id='phone' 
                            placeholder='21 4002-8922'
                            {...register('tel', {required:false})}  
                        />
                    </div>
                </div>
                <button 
                    type='submit' 
                    className='mt-3'>
                        Atualizar dados
                </button>
              </form>
            </div>
        </Modal>
    </>
    )
}