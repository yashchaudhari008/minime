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
			setNotepadContent(ls_NotepadContent);
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
	const onFocusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
		// https://gist.github.com/piyonishi/409ecbd07f7b86b7da205ad61210a275
		const tempContent = e.target.value;
		e.target.value = "";
		e.target.value = tempContent;
	}

	return (
		<Modal showModal={show} onCloseClick={onClose} headerText="Quick Note" rightSideModal>
			<textarea id="notes" autoFocus onFocus={onFocusHandler} value={notepadContent} onChange={onChangeHandler} className={styles.notes} placeholder="Add a note here" />
		</Modal>
	);
};

export default NotepadWidgetModal;
