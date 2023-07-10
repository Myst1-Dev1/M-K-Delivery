import { FaTimes, FaUpload } from 'react-icons/fa';
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '@/services/hooks/useProducts';
import { useRouter } from 'next/router';

interface ProductModalProps {
    isOpen:boolean;
    onRequestClose:() => void;
}

export function ProductModal({ isOpen, onRequestClose }:ProductModalProps) {
    const { register, handleSubmit, setValue } = useForm();
    const { CreateProducts } = useContext(ProductContext);

    const router = useRouter();

    async function handleCreateNewProduct(data:any) {
        await CreateProducts(data);
        router.reload();
    }

    return (
        <>
            <Modal
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
                    <h3>Cadastrar produto</h3>
                    <FaTimes onClick={onRequestClose} className={styles.icon} />
                  </div>
                  <form 
                    onSubmit={handleSubmit(handleCreateNewProduct)} 
                    className={`mt-4 ${styles.formContainer}`}
                    encType="multipart/form-data"
                   >
                    <div className='d-flex mb-3 align-items-center justify-content-between'>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label className='d-flex gap-3' htmlFor="image">
                                <FaUpload className={styles.icon} />
                                <span>Enviar arquivo</span>
                            </label>
                            <input 
                                {...register('image')} 
                                type="file" 
                                id='image'
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setValue('image', file);
                                }}
                            />
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="name">Nome</label>
                            <input 
                                {...register('name')} 
                                type="text" 
                                placeholder='Hot Roll' 
                                id='name' 
                            />
                        </div>
                    </div>
                    <div className='d-flex mb-3 align-items-center justify-content-between'>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="details">Detalhes</label>
                            <input 
                                {...register('details')} 
                                type="text" 
                                placeholder='Composto por: ...' 
                                id='details' 
                            />
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="price">Preço</label>
                            <input 
                                {...register('price')} 
                                type="number"
                                step="0.01" 
                                min="0" 
                                max="100"
                                placeholder='15.40' 
                                id='price' 
                            />
                        </div>
                    </div>
                    <div className='d-flex mb-3 align-items-center justify-content-between'>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="amount">Quantidade</label>
                            <input 
                                {...register('amount')} 
                                type="number" 
                                placeholder='4' 
                                id='amount' 
                            />
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="type">Tipo</label>
                            <select id="type" {...register('type')} >
                                <option value="Sushi">Sushi</option>
                                <option value="Frutos do mar">Frutos do mar</option>
                                <option value="Carne">Carne</option>
                                <option value="Macarrão">Macarrão</option>
                                <option value="Brasileira">Brasileira</option>
                                <option value="Salada">Salada</option>
                                <option value="Sobremesa">Sobremesa</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit'>Cadastrar</button>
                  </form>
                </div>
            </Modal>
        </>
    )
}