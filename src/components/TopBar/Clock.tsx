import { useEffect, useState } from "react";
import { getTime } from "../../utils/clockUtils";
import styles from "./clock.module.scss";

const Clock = () => {
	const [currentTime, setCurrentTime] = useState(getTime(new Date()));

	useEffect(() => {
		let ref = setInterval(() => {
			let currentTimeObj = new Date();
			setCurrentTime(getTime(currentTimeObj));
		}, 1000);
		return () => clearInterval(ref);
	}, []);

	return (
		<div className={styles.clock}>
			{currentTime.time}
			<span className={styles.meridiem}>{currentTime.meridiem}</span>
		</div>
	);
};

export default Clock;
