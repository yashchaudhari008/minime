import Modal from "../shared/Modal/Modal";
import styles from "./notepadWidgetModal.module.scss";

type NotepadWidgetModalProps = {
	show: boolean;
	onClose: () => void;
};

const NotepadWidgetModal = ({
	show,
	onClose,
}: NotepadWidgetModalProps) => {

	return (
		<Modal showModal={show} headerText="Quick Note">
			<textarea className={styles.notes} placeholder="Add a note here" />
		</Modal>
	);
};

export default NotepadWidgetModal;
