import { PageBanner } from '@/components/pageBanner';
import styles from './styles.module.scss';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { UserContext } from '@/services/hooks/useUsers';
import Link from 'next/link';

export default function UsersList() {
    const { allUser, deleteUserData } = useContext(UserContext);

    console.log(allUser);

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
                        {allUser.map((user, index) => {
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
                                            <Link href={`userProfile/${user._id}`}>
                                                <FaEye className={styles.viewIcon} />
                                            </Link>
                                            <FaTrashAlt
                                                onClick={() => deleteUserData(user._id)}
                                                className={styles.deleteIcon} 
                                            />
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