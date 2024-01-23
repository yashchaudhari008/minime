import { getWidgets, WidgetType } from "../../utils/widgetsUtils";
import type { WidgetData } from "../../utils/widgetsUtils";

import AddNewWidgetBtn from "../widgets/AddNewWidgetBtn/AddNewWidgetBtn";
import BookmarkWidget from "../widgets/BookmarkWidget/BookmarkWidget";
import styles from "./widgetHolder.module.scss";

const WidgetHolder = () => {
	const widgetsData = getWidgets();

	const getWidgetDOM = (widgetData: WidgetData, index: number) => {
		switch (widgetData.type) {
			case WidgetType.BookmarkWidget:
				return <BookmarkWidget key={index} {...widgetData} />;
		}
	};
	return (
		<div className={styles.widgetHolderWrapper}>
			<div className={styles.widgetHolder}>
				{widgetsData.map((widgetData, index) => {
					return <div className={styles.widget}>{getWidgetDOM(widgetData, index)}</div>;
				})}
				<AddNewWidgetBtn />
			</div>
		</div>
	);
};

export default WidgetHolder;
