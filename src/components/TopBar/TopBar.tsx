import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Clock from "./Clock";
import styles from "./topBar.module.scss";

const TopBar = () => {
	return (
		<div className={styles.topBar}>
			<Clock />
			<FontAwesomeIcon icon={faGear} className={styles.settingsIcon} size="2xl" />
		</div>
	);
};

export default TopBar;
