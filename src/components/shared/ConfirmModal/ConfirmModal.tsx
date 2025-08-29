import Modal from "../Modal/Modal";
import styles from "./confirmModal.module.scss";

type ConfirmModalProps = {
	show: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	confirmButtonVariant?: 'danger' | 'primary';
};

const ConfirmModal = ({
	show,
	title,
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	onCancel,
	confirmButtonVariant = 'danger'
}: ConfirmModalProps) => {
	return (
		<Modal showModal={show} headerText={title}>
			<div className={styles.confirmModalContent}>
				<div className={styles.message}>
					{message}
				</div>
				<div className={styles.actions}>
					<button 
						type="button" 
						className={`${styles.button} ${styles.cancelButton}`}
						onClick={onCancel}
					>
						{cancelText}
					</button>
					<button 
						type="button" 
						className={`${styles.button} ${styles.confirmButton} ${styles[confirmButtonVariant]}`}
						onClick={onConfirm}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
