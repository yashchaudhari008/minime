import { useEffect, useState } from "react";
import { getNotepadContent, saveNotepadContent } from "../../utils/notepadUtils";
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
	const [notepadContent, setNotepadContent] = useState("");

	useEffect(() => {
		const ls_NotepadContent = getNotepadContent();
		if (ls_NotepadContent) {
			setNotepadContent(notepadContent);
		}
	}, [])

	useEffect(() => {
		const autoSaveTimer = setTimeout(() => {
			saveNotepadContent(notepadContent);
		}, 500);

		return () => clearTimeout(autoSaveTimer);
	}, [notepadContent])

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNotepadContent(e.target.value);
	}

	return (
		<Modal showModal={show} onCloseClick={onClose} headerText="Quick Note" rightSideModal>
			<textarea id="notes" autoFocus value={notepadContent} onChange={onChangeHandler} className={styles.notes} placeholder="Add a note here" />
		</Modal>
	);
};

export default NotepadWidgetModal;
