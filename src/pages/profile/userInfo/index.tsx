import { FaPencilAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { UpdateProfileModal } from './UpdateProfileModal';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserContext } from '../../../services/hooks/useUsers';

export function UserInfo() {
    const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);


    function handleOpenProfileModal() {
        setIsNewProfileModalOpen(true);
    }

    function handleCloseProfileModal() {
        setIsNewProfileModalOpen(false);
    }

    return (
        <>
            <div className={`${styles.userInfoBox}`}>
                <h3 className='fw-bold'>Informações do usuário</h3>
                {isAuthenticated ? 
                <div>
                    {user.map(user => {
                        return (
                            <div key={user.data._id}>
                                 <div className='d-flex flex-column gap-3 mt-4'>
                                    <h6>Primeiro Nome: {user.data.firstname }</h6>
                                    <h6>Último Nome: {user.data.lastname}</h6>
                                    <h6>Email: {user.data.email}</h6>
                                    <h6>Telefone: {user.data.tel}</h6>
                                </div>
                                <button onClick={handleOpenProfileModal} 
                                    className='mt-5'>
                                        <FaPencilAlt className={styles.icon} /> Editar Perfil
                                </button>
                                <UpdateProfileModal
                                    onUser = {user.data}
                                    userId = {user.data._id}
                                    isOpen={isNewProfileModalOpen} 
                                    onRequestClose={handleCloseProfileModal} 
                                />
                            </div>
                        )
                    })}
                </div> : 'sem dados'}
            </div>
            
        </>
    )
}