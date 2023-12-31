import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUserData, deleteUserData } from '../../store/user/user';
import { toast } from 'react-toastify';
import { ConfirmationBox } from '../../components/confirmationBox';

export default function UsersList() {
    const dispatch = useDispatch();

    const [confirmationBox, setConfirmationBox] = useState(false);

    const allUser = useSelector((state:any) => state.userData.allUser);
    const user = useSelector((state:any) => state.userData.user);

    const isAuthenticated = !!user;
    console.log(allUser);

    const router = useRouter();

   function handleDelete(id:string) {
    try {
        dispatch(deleteUserData(id));
        router.reload();

        toast.success('usuário deletado com sucesso', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })
    } catch (error) {
        toast.error('Tivemos um erro', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })
    }
   }

   function handleConfirmDeleteUser() {
    setConfirmationBox(true);
   }

    useEffect(() => {
        if(!isAuthenticated && allUser.map((user:any) => user.isAdmin === false)) {
            router.push('/page401');
        }
    }, [])

    useEffect(() => {
        dispatch(fetchAllUserData());
    }, [])

return (
    <>
        <PageBanner>Usuários</PageBanner>

        <div>
            <h2 className='py-5 text-center fw-bold'>Lista de usuários cadastrados</h2>

            <div className='py-5 table-responsive'>
            <table className={`table container table-borderless ${styles.tableContainer}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tel</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                    <tbody>
                        {allUser === undefined ? '' : allUser?.map((user:any, index:number) => {
                            return (
                                <tr key={user._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <div className={styles.imgContainer}>
                                            <img src={user.image} alt="user-image" />
                                        </div>
                                    </td>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.tel}</td>
                                    <td>
                                        <div 
                                            className='d-flex justify-content-center m-auto'>
                                            {user.isAdmin === true ? '' :
                                                <div>
                                                    <FaTrashAlt
                                                        onClick={handleConfirmDeleteUser}
                                                        className={styles.deleteIcon} 
                                                    />
                                                    {confirmationBox && (
                                                    <ConfirmationBox
                                                    children="Você tem certeza que deseja deletar o usuário?"
                                                    handleConfirm={() => {
                                                      // Lógica para confirmar a exclusão
                                                      handleDelete(user._id)
                                                    }}
                                                    handleCancel={() => {
                                                      // Lógica para cancelar a exclusão
                                                      setConfirmationBox(false);
                                                    }}
                                                  />
                                                  
                                                )}
                                                </div>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>
)
}