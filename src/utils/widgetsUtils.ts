export enum WidgetType {
	BookmarkWidget,
}

export type WidgetData = {
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
	const oldWidgetsData = getWidgets();
	try {
		const newWidgetsData = [...oldWidgetsData, newWidgetData];
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
		return newWidgetsData;
	} catch (e) {
		console.error("Failed while adding new widget:", e);
	}
	return oldWidgetsData;
};

export const editWidget = (updatedWidgetData: WidgetData, atIndex: number) => {
	const oldWidgetsData = getWidgets();
	try {
		// Filter widget to be editted
		const newWidgetsData = oldWidgetsData.filter((_, ind) => atIndex !== ind);
		// Insert the updated widget into newWidgetsData
		newWidgetsData.splice(atIndex, 0, updatedWidgetData);
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));

		return newWidgetsData;
	} catch (e) {
		console.error("Failed while editing widget:", e);
	}
	return oldWidgetsData;
};

export const updateWidgetsData = (newWidgetsData: WidgetData[]) => {
	try {
		localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
	} catch (e) {
		console.error("Failed while updating widgets data:", e);
	}
};
