import { SyntheticEvent } from "react";
import type { WidgetData } from "../../../utils/widgetsUtils";
import { getFaviconLink } from "./bookmarkUtils";
import styles from "./bookmarkWidget.module.scss";

type BookmarkWidgetProps = WidgetData;

const BookmarkWidget = ({ name, link }: BookmarkWidgetProps) => {
	const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		window.open(link, "_blank");
		e.currentTarget.blur();
	};

	return (
		<button className={styles.bookmarkWidget} onClick={onClickHandler}>
			<div className={styles.faviconHolder}>
				<img src={getFaviconLink(link)} className={styles.favicon} />
			</div>
			<span className={styles.nameWrapper}>{name || link}</span>
		</button>
	);
};

export default BookmarkWidget;
