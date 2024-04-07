import { SyntheticEvent } from "react";
import useHover from "../../../hooks/useHover";
import type { WidgetData } from "../../../utils/widgetsUtils";
import { getFaviconLink } from "./bookmarkUtils";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bookmarkWidget.module.scss";

type BookmarkWidgetProps = WidgetData;

const BookmarkWidget = ({ name, link }: BookmarkWidgetProps) => {
	const [hoverRef, isHovered] = useHover();

	const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		window.open(link, "_self");
		e.currentTarget.blur();
	};

	return (
		<button className={styles.bookmarkWidget} onClick={onClickHandler} ref={hoverRef}>
			<div className={styles.faviconHolder}>
				<img src={getFaviconLink(link)} className={styles.favicon} />
			</div>
			<span className={styles.nameWrapper}>{name || link}</span>
			{isHovered && (
				<>
					<div className={`${styles.button} ${styles.deleteButton}`}>
						<FontAwesomeIcon
							title="Delete"
							color="#000"
							size="lg"
							icon={faClose}
							className={styles.icon}
						/>
					</div>
					<div className={`${styles.button} ${styles.editButton}`}>
						<FontAwesomeIcon
							title="Edit"
							color="#000"
							icon={faPen}
							className={styles.icon}
						/>
					</div>
				</>
			)}
		</button>
	);
};

export default BookmarkWidget;
