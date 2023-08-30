import { PageBanner } from '../../components/pageBanner';
import styles from './styles.module.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../services/hooks/useUsers';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function UsersList() {
    const { allUser, deleteUserData } = useContext(UserContext);
    const { isAuthenticated } = useContext(AuthContext);

    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated && allUser.map(user => user.isAdmin === false)) {
            router.push('/page404');
        }
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
                        {allUser === undefined ? '' : allUser.map((user, index) => {
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
                                        <div className='d-flex align-items-center gap-3'>
                                            {/* <Link href={`userProfile/${user._id}`}>
                                                <FaEye className={styles.viewIcon} />
                                            </Link> */}
                                            {user.isAdmin === true ? '' :
                                                <FaTrashAlt
                                                    onClick={() => deleteUserData(user._id)}
                                                    className={styles.deleteIcon} 
                                                />
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