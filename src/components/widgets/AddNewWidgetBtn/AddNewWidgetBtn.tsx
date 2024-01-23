import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./addNewWidgetBtn.module.scss";

const AddNewWidgetBtn = () => {
	return (
		<button role="button" className={styles.addNewWidget}>
			<FontAwesomeIcon icon={faPlus} className={styles.icon} />
		</button>
	);
};

export default AddNewWidgetBtn;
