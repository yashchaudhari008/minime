import { SyntheticEvent } from "react";
import type { WidgetData } from "../../../utils/widgetsUtils";
import { getConfirmDialogMessage, getFaviconLink } from "../BookmarkWidget/bookmarkUtils";
import { faClose, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./mobileBookmarkWidget.module.scss";

type BookmarkWidgetProps = WidgetData & {
	widgetIndex: number;
	handleWidgetDelete: (index: number) => void;
	handleWidgetEdit: (index: number) => void;
};

const MobileBookmarkWidget = ({
	widgetIndex,
	name,
	link,
	handleWidgetDelete,
	handleWidgetEdit,
}: BookmarkWidgetProps) => {
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
		<div className={styles.root}>
			<button className={styles.bookmarkButton} onClick={onClickHandler}>
				<div className={styles.faviconHolder}>
					<img src={getFaviconLink(link)} className={styles.favicon} />
				</div>
				{name && <span className={styles.nameWrapper}>{name}</span>}
			</button>

			<div role="button" className={styles.action}>
				<div className={styles.actionButton} onClick={onDeleteBtnClick}>
					<FontAwesomeIcon
						title="Delete"
						color="#000"
						size="lg"
						icon={faClose}
						className={styles.actionButtonIcon}
					/>
				</div>
				<div className={styles.actionButton} onClick={onEditBtnClick}>
					<FontAwesomeIcon
						title="Edit"
						color="#000"
						icon={faPen}
						className={styles.actionButtonIcon}
					/>
				</div>
			</div>
		</div>
	);
};

export default MobileBookmarkWidget;
