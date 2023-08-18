import { FaTimes, FaUpload } from 'react-icons/fa';
import styles from './styles.module.scss';
import Modal from 'react-modal';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ProductContext } from '../../services/hooks/useProducts';
import { useRouter } from 'next/router';

interface ProductModalProps {
    dataItem:any;
    id:string;
    isOpen:boolean;
    onRequestClose:() => void;
}

export function UpdateProductModal({ id ,isOpen, onRequestClose, dataItem }:ProductModalProps) {
    const { register, handleSubmit, setValue } = useForm();
    const { UpdateProducts } = useContext(ProductContext);

    const router = useRouter();

    // async function handleUpdateProduct(data:any) {
    //     try {
    //         const {'mk-delivery.token': token} = parseCookies();

    //         const formData = new FormData();
    //         formData.append('name', data.name);
    //         formData.append('details', data.details);
    //         formData.append('price', data.price.toString());
    //         formData.append('amount', data.amount.toString());
    //         formData.append('type', data.type);
    //         formData.append('image', data.image);

    //         const res = await api.put(`/products/${id}`, formData, {
    //             headers: {
    //               'auth-token': token,
    //             },
    //           });

    //           const { product } = res.data;
    
    //           setProducts([
    //               ...products,
    //               product,
    //           ])   
              
    //           toast.success('Produto atualizado com sucesso', {
    //             position:toast.POSITION.TOP_RIGHT,
    //             theme:'colored'
    //         })
            
    //     } catch (error) {
    //         console.log(error);
    //         toast.error('Tivemos um erro', {
    //             position:toast.POSITION.TOP_RIGHT,
    //             theme:'colored'
    //         })
    //     }
    // }

    async function handleUpdateProduct(data:any) {
        await UpdateProducts(id, data);

        console.log(data.image);
    }

    useEffect(() => {
        // Preencher os campos do formulário com os valores iniciais (dados antigos)
        setValue('name', dataItem.name);
        setValue('details', dataItem.details);
        setValue('price', dataItem.price);
        setValue('amount', dataItem.amount);
        setValue('type', dataItem.type);
        setValue('image', dataItem.image);
        // ... outros campos

    }, [dataItem, setValue]);

    // Resto do seu componente ...

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
                      backgroundColor: 'rgba(0,0,0,0.2)'
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
                    onSubmit={handleSubmit(handleUpdateProduct)} 
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
                                {...register('image', {required:false})} 
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
                                {...register('name' , {required:false})} 
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
                                {...register('details', {required:false} )} 
                                type="text" 
                                placeholder='Composto por: ...' 
                                id='details' 
                            />
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="price">Preço</label>
                            <input 
                                {...register('price', {required:false})} 
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
                                {...register('amount', {required:false})} 
                                type="number" 
                                placeholder='4' 
                                id='amount' 
                            />
                        </div>
                        <div className={`d-flex flex-column gap-2 ${styles.inputBox}`}>
                            <label htmlFor="type">Tipo</label>
                            <select data-testid="select" id="type" 
                                {...register('type', {required:false})} >
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
                    <button data-testid="submit-button" type='submit'>Atualizar Produto</button>
                  </form>
                </div>
            </Modal>
        </>
    )
}