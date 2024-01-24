import React from "react";
import styles from "./modal.module.scss";

type ModalProps = {
	showModal: boolean;
	headerText?: string;
};

const Modal = ({
	children: modalContent,
	showModal,
	headerText,
}: React.PropsWithChildren<ModalProps>) => {
	return (
		showModal && (
			<div className={styles.overlay}>
				<div className={styles.modal}>
					{headerText && <div className={styles.header}>{headerText}</div>}
					{modalContent}
				</div>
			</div>
		)
	);
};

export default Modal;
