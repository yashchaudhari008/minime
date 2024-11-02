import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import styles from "./settings.module.scss";

const Settings = () => {
	const navigate = useNavigate();

	const closeSettingPage = () => {
		navigate("/");
	};

	return (
		<div className={styles.settingsWrapper}>
			<div className={styles.settings}>
				<div className={styles.header}>
					<p className={styles.headerText}>Settings</p>
					<FontAwesomeIcon
						icon={faClose}
						size="2xl"
						className={styles.closeIcon}
						onClick={closeSettingPage}
					/>
				</div>
				<div className={styles.content}></div>
				<div className={styles.footer}>
					<button className={styles.saveBtn}>
						<FontAwesomeIcon icon={faSave} />
						<span className={styles.saveBtnText}>Save</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
