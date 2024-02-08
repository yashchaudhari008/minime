export enum WidgetType {
	BookmarkWidget,
}

export type WidgetData = {
	id: number;
	type: WidgetType;
	name?: string;
	link: string;
};

export const getWidgets = () => {
	const localStorageWidgetsData = localStorage.getItem("widgetsData");

	try {
		if (!localStorageWidgetsData) {
			console.log("No Widget Found!");
			return [];
		}
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

export const updateWidgetsData = (newWidgetsData: WidgetData[]) => {
	try {
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
	} catch (e) {
		console.error("Failed while updating widgets data:", e);
	}
};

export const deleteWidget = (id: number) => {
	const localStorageWidgetsData = localStorage.getItem("widgetsData");
	try {
		const widgets: WidgetData[] = JSON.parse(localStorageWidgetsData || "") || [];
		const newWidgetsData: WidgetData[] = widgets.filter((widget) => widget.id !== id);
		localStorage.clear();
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
	} catch (e) {
		console.log("Failed to delete a widget", e);
	}
};
