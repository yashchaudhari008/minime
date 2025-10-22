import React from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";

type ModalProps = {
	showModal: boolean;
	onCloseClick?: () => void;
	headerText?: string;
	rightSideModal?: boolean;
};

const Modal = ({
	children: modalContent,
	showModal,
	headerText,
	rightSideModal = false,
	onCloseClick
}: React.PropsWithChildren<ModalProps>) => {
	const overlayClass = classNames(styles.overlay, {
		[styles.rightSideModal]: rightSideModal,
	});
	return (
		showModal && (
			<div className={overlayClass} onClick={onCloseClick}>
				<div className={styles.modal} onClick={(e) => {
					e.stopPropagation();
				}}>
					{headerText && <div className={styles.header}>{headerText}</div>}
					{modalContent}
				</div>
			</div>
		)
	);
};

export default Modal;
