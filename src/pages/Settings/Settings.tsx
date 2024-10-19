import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import styles from "./settings.module.scss";

const Settings = () => {
	const navigate = useNavigate();

	const closeSettingPage = () => {
		navigate("/");
	};

	const getHeaderDom = () => {
		return (
			<div className={styles.headerWrapper}>
				<div className={styles.header}>
					<p className={styles.headerText}>Settings</p>
					<FontAwesomeIcon
						icon={faClose}
						size="2xl"
						className={styles.closeIcon}
						onClick={closeSettingPage}
					/>
				</div>
			</div>
		);
	};

	const getFooterDom = () => {
		return (
			<div className={styles.footer}>
				<button className={styles.saveBtn}>
					<FontAwesomeIcon icon={faSave} />
					<span className={styles.saveBtnText}>Save</span>
				</button>
			</div>
		);
	};

	return (
		<div className={styles.mainWrapper}>
			<div className={styles.settings}>
				{getHeaderDom()}
				{getFooterDom()}
			</div>
		</div>
	);
};

export default Settings;
