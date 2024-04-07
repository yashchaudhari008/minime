import { type FormEvent } from "react";
import { WidgetType, type WidgetData } from "../../utils/widgetsUtils";
import Modal from "../shared/Modal/Modal";
import InputField from "../shared/InputField/InputField";
import styles from "./addEditWidgetModal.module.scss";

type AddEditWidgetModalProps = {
	isEditModal: boolean;
	show: boolean;
	onClose: () => void;
	addEditHandler: (widgetData: WidgetData) => void;
	widgetToEditData?: WidgetData;
};

const AddEditWidgetModal = ({
	isEditModal,
	show,
	onClose,
	addEditHandler,
	widgetToEditData,
}: AddEditWidgetModalProps) => {
	const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const nameFromForm = formData.get("name")?.toString();
		const linkFromForm = formData.get("url")?.toString() || "";

		if (!linkFromForm) {
			alert("Link is Invalid!");
			return;
		}
		const newWidgetData: WidgetData = {
			type: WidgetType.BookmarkWidget,
			link: linkFromForm,
			name: nameFromForm,
		};

		addEditHandler(newWidgetData);
	};

	const defaultName = isEditModal ? widgetToEditData?.name || "" : "";
	const defaultLink = isEditModal ? widgetToEditData?.link || "" : "";
	return (
		<Modal showModal={show} headerText={`${isEditModal ? "Edit" : "New"} Bookmark`}>
			<form className={styles.modalContent} onSubmit={onFormSubmit}>
				<div className={styles.formInputHolder}>
					<InputField id="name" label="Name" defaultValue={defaultName} />
				</div>
				<div className={styles.formInputHolder}>
					<InputField
						id="url"
						label="Link"
						type="url"
						required
						defaultValue={defaultLink}
					/>
				</div>
				<div className={styles.modalFooter}>
					<button type="button" onClick={onClose}>
						Cancel
					</button>
					<button type="submit">{isEditModal ? "Update" : "Add"}</button>
				</div>
			</form>
		</Modal>
	);
};

export default AddEditWidgetModal;
