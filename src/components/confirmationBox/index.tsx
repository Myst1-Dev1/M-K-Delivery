import styles from './styles.module.scss';

import { ReactNode } from 'react';

interface confirmationBoxProps {
  children: ReactNode; // O texto que você deseja exibir no componente
  handleConfirm: () => void; // Função para o botão "Sim"
  handleCancel: () => void; // Função para o botão "Não"
}

export function ConfirmationBox({
  children,
  handleConfirm,
  handleCancel,
}: confirmationBoxProps) {
  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.deleteConfirmationBox}>
        <p>{children}</p>
        <div className='d-flex justify-content-center gap-5'>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Sim
          </button>
          <button onClick={handleCancel} className={styles.closeConfirmationBox}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
