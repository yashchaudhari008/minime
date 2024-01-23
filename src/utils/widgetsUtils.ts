export enum WidgetType {
	BookmarkWidget,
}

export type WidgetData = {
	widgetIndex: number;
	type: WidgetType;
	name?: string;
	link: string;
};

export const getWidgets = () => {
	const localStorageWidgetsData = localStorage.getItem("widgetsData");
	try {
		const widgetsData: WidgetData[] = JSON.parse(localStorageWidgetsData || "") || [];
		return widgetsData;
	} catch (e) {
		console.error("Invalid Widgets Data:", e);
		return [];
	}
};

export const addWidget = (newWidgetData: WidgetData) => {
	try {
		const oldWidgetsData = getWidgets();
		const newWidgetsData = [...oldWidgetsData, newWidgetData];
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
	} catch (e) {
		console.error("Failed while adding new widget:", e);
	}
};
