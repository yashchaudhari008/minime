import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Clock from "./Clock";
import styles from "./topBar.module.scss";

const TopBar = () => {
	const navigate = useNavigate();

	const openSettingsPage = () => {
		navigate("/minime/settings");
	};
	return (
		<div className={styles.topBar}>
			<Clock />
			<FontAwesomeIcon
				icon={faGear}
				className={styles.settingsIcon}
				size="2xl"
				onClick={openSettingsPage}
			/>
		</div>
	);
};

export default TopBar;
