import { SyntheticEvent } from "react";
import useHover from "../../../hooks/useHover";
import type { WidgetData } from "../../../utils/widgetsUtils";
import { getConfirmDialogMessage, getFaviconLink } from "./bookmarkUtils";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bookmarkWidget.module.scss";

type BookmarkWidgetProps = WidgetData & {
	widgetIndex: number;
	handleWidgetDelete: (index: number) => void;
	handleWidgetEdit: (index: number) => void;
};

const BookmarkWidget = ({
	widgetIndex,
	name,
	link,
	handleWidgetDelete,
	handleWidgetEdit,
}: BookmarkWidgetProps) => {
	const [hoverRef, isHovered] = useHover();

	const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		window.open(link, "_self");
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

	return (
		<button className={styles.bookmarkWidget} onClick={onClickHandler} ref={hoverRef}>
			<div className={styles.faviconHolder}>
				<img src={getFaviconLink(link)} className={styles.favicon} />
			</div>
			{name && <span className={styles.nameWrapper}>{name}</span>}
			{isHovered && (
				<>
					<div
						className={`${styles.button} ${styles.deleteButton}`}
						onClick={onDeleteBtnClick}
					>
						<FontAwesomeIcon
							title="Delete"
							color="#000"
							size="lg"
							icon={faClose}
							className={styles.icon}
						/>
					</div>
					<div
						className={`${styles.button} ${styles.editButton}`}
						onClick={onEditBtnClick}
					>
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
