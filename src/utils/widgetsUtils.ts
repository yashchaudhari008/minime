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
		const widgetsData: WidgetData[] =
			JSON.parse(localStorageWidgetsData || "") || [];
		return widgetsData;
	} catch (e) {
		console.error("Invalid Widgets Data:", e);
		return [];
	}
};
