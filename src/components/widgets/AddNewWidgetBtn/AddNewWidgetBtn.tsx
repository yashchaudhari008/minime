import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./addNewWidgetBtn.module.scss";

const AddNewWidgetBtn = ({
	onClick: onClickHandler,
}: React.HTMLProps<HTMLButtonElement>) => {
	return (
		<button role="button" className={styles.addNewWidget} onClick={onClickHandler}>
			<FontAwesomeIcon icon={faPlus} className={styles.icon} />
		</button>
	);
};

export default AddNewWidgetBtn;
