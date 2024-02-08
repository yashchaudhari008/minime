import { SyntheticEvent, useState } from "react";
import type { WidgetData } from "../../../utils/widgetsUtils";
import { getFaviconLink } from "./bookmarkUtils";
import { faPen, faXmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bookmarkWidget.module.scss";

type BookmarkWidgetProps = WidgetData;

const BookmarkWidget = ({ name, link }: BookmarkWidgetProps) => {
	const [showModal, setShowModal] = useState(false);
	const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		window.open(link, "_self");
		e.currentTarget.blur();
	};

	const openMenu = (e: SyntheticEvent) => {
		e.stopPropagation();
		setShowModal(true);
	};

	const closeMenu = () => {
		setShowModal(false);
	};

	const moreOptionsDom = () => {
		return (
			// TODO: try another logic to close the modal instead of onMouseLeave
			<div className={styles.moreOptions} onMouseLeave={closeMenu}>
				<div
					className={styles.moreOptionButton}
					onClick={() => console.log("Edit Working")}
				>
					<FontAwesomeIcon icon={faPen} className={styles.icon} />
					<span className={styles.name}>Edit</span>
				</div>
				<div
					className={styles.moreOptionButton}
					onClick={() => console.log("Delete Working")}
				>
					<FontAwesomeIcon icon={faXmark} className={styles.icon} />
					<span className={styles.name}>Delete</span>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.bookmarkWidgetContainer}>
			<button className={styles.bookmarkWidget} onClick={onClickHandler}>
				<div className={styles.faviconHolder}>
					<img src={getFaviconLink(link)} className={styles.favicon} />
				</div>
				<span className={styles.nameWrapper}>{name || link}</span>
				<button className={styles.editBookmarkWidget} onClick={(e) => openMenu(e)}>
					<FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
				</button>
			</button>
			{showModal && moreOptionsDom()}
		</div>
	);
};

export default BookmarkWidget;
