import { FormEvent, useState } from "react";
import Modal from "../Modal/Modal";
import InputField from "../InputField/InputField";
import styles from "./WidgetForm.module.scss";

type WidgetFormProps = {
	isEditMode?: boolean;
	showModal: boolean;
	currentName?: string;
	currentLink?: string;
	onFormSubmit?: (name: string, link: string) => void;
	onCancelClick: () => void;
};

const WidgetForm = ({
	isEditMode = false,
	showModal,
	currentName = "",
	currentLink = "",
	onFormSubmit,
	onCancelClick,
}: WidgetFormProps) => {
	const [name, setName] = useState(currentName);
	const [link, setLink] = useState(currentLink);

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// To check if onFormSubmit function is undefined or not
		if (onFormSubmit) {
			onFormSubmit(name, link);
		}
		setName("");
		setLink("");
	};

	const headerText = isEditMode ? "Update" : "New";
	const buttonText = isEditMode ? "Save" : "Add";

	return (
		<Modal showModal={showModal} headerText={`${headerText} Bookmark`}>
			<form className={styles.modalContent} onSubmit={handleFormSubmit}>
				<div className={styles.formInputHolder}>
					<InputField id="name" label="Name" value={name} setValue={setName} />
				</div>
				<div className={styles.formInputHolder}>
					<InputField
						id="url"
						label="Link"
						type="url"
						value={link}
						required
						setValue={setLink}
					/>
				</div>
				<div className={styles.modalFooter}>
					<button type="button" onClick={onCancelClick}>
						Cancel
					</button>
					<button type="submit">{buttonText}</button>
				</div>
			</form>
		</Modal>
	);
};

export default WidgetForm;
