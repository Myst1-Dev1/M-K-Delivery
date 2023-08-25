import { FaPencilAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
import { UpdateProfileModal } from './UpdateProfileModal';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserContext } from '../../../services/hooks/useUsers';
import { useRouter } from 'next/router';

export function UserInfo() {
    const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);
    const { user, allUser } = useContext(UserContext);

    const router = useRouter();

    const { id } = router.query;

    const userData = allUser.find(user => user._id === id)

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
                    <div key={userData?._id}>
                            <div className='d-flex flex-column gap-3 mt-4'>
                            <h6>Primeiro Nome: {userData?.firstname }</h6>
                            <h6>Último Nome: {userData?.lastname}</h6>
                            <h6>Email: {userData?.email}</h6>
                            <h6>Telefone: {userData?.tel}</h6>
                        </div>
                        <button onClick={handleOpenProfileModal} 
                            className='mt-5'>
                                <FaPencilAlt className={styles.icon} /> Editar Perfil
                        </button>
                        {/* <UpdateProfileModal
                            onUser = {user.data}
                            userId = {user.data._id}
                            isOpen={isNewProfileModalOpen} 
                            onRequestClose={handleCloseProfileModal} 
                        /> */}
                    </div>         
                </div> : 'sem dados'}
            </div>
            
        </>
    )
}