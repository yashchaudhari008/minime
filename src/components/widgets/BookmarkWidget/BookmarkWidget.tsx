import { SyntheticEvent } from "react";
import useHover from "../../../hooks/useHover";
import type { WidgetData } from "../../../utils/widgetsUtils";
import { getConfirmDialogMessage, getFaviconLink } from "./bookmarkUtils";
import { faClose, faPen, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bookmarkWidget.module.scss";
type BookmarkWidgetProps = WidgetData & {
	widgetIndex: number;
	handleWidgetDelete: (index: number) => void;
	handleWidgetEdit: (index: number) => void;
	handleWidgetPin: (index: number) => void;
};

const BookmarkWidget = ({
	widgetIndex,
	name,
	link,
	pinned,
	handleWidgetDelete,
	handleWidgetEdit,
	handleWidgetPin,
}: BookmarkWidgetProps) => {
	const [hoverRef, isHovered] = useHover();

	const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		window.open(link, "_blank");
		e.currentTarget.blur();
	};

	const onDeleteBtnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		if (confirm(getConfirmDialogMessage(link, name)) === true) {
			handleWidgetDelete(widgetIndex);
		}
	};

	const onEditBtnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		handleWidgetEdit(widgetIndex);
	};
	const onPinBtnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		handleWidgetPin(widgetIndex);
	};
	return (
		<button className={styles.bookmarkWidget} onClick={onClickHandler} ref={hoverRef}>
			<div className={styles.faviconHolder}>
				<img src={getFaviconLink(link)} className={styles.favicon} />
			</div>
			{name && <span className={styles.nameWrapper}>{name}</span>}
			{pinned && !isHovered && (
				<div className={`${styles.button} ${styles.pinButton} ${styles.pinnedActive}`}>
					<FontAwesomeIcon title="Pinned" icon={faThumbtack} className={styles.icon} />
				</div>
			)}
			{isHovered && (
				<>
					<div
						className={`${styles.button} ${styles.deleteButton}`}
						onClick={onDeleteBtnClick}
					>
						<FontAwesomeIcon
							title="Delete"
							size="lg"
							icon={faClose}
							className={styles.icon}
						/>
					</div>

					<div
						className={`${styles.button} ${styles.editButton}`}
						onClick={onEditBtnClick}
					>
						<FontAwesomeIcon title="Edit" icon={faPen} className={styles.icon} />
					</div>

					<div
						className={`${styles.button} ${styles.pinButton} ${
							pinned ? styles.pinnedActive : ""
						}`}
						onClick={onPinBtnClick}
					>
						<FontAwesomeIcon
							title={pinned ? "Unpin" : "Pin"}
							icon={faThumbtack}
							className={styles.icon}
						/>
					</div>
				</>
			)}
		</button>
	);
};

export default BookmarkWidget;
