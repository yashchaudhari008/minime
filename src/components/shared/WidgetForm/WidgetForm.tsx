import Modal from "../Modal/Modal";
import InputField from "../InputField/InputField";
import styles from "./WidgetForm.module.scss";

type WidgetFormProps = {
	showModal: boolean;
	onFormSubmit: () => void;
	onCancelClick: () => void;
};

const WidgetForm = ({ showModal, onFormSubmit, onCancelClick }: WidgetFormProps) => {
	return (
		<Modal showModal={showModal} headerText="New Bookmark">
			<form className={styles.modalContent} onSubmit={onFormSubmit}>
				<div className={styles.formInputHolder}>
					<InputField id="name" label="Name" />
				</div>
				<div className={styles.formInputHolder}>
					<InputField id="url" label="Link" type="url" required />
				</div>
				<div className={styles.modalFooter}>
					<button type="button" onClick={onCancelClick}>
						Cancel
					</button>
					<button type="submit">Add</button>
				</div>
			</form>
		</Modal>
	);
};

export default WidgetForm;
