export enum WidgetType {
	BookmarkWidget,
}

export type WidgetData = {
	type: WidgetType;
	name?: string;
	link: string;
};

const ls_widgetsData_key = "minime/widgetsData";

export const getWidgets = () => {
	const localStorageWidgetsData = localStorage.getItem(ls_widgetsData_key);

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
		localStorage.setItem(ls_widgetsData_key, JSON.stringify(newWidgetsData));
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
		localStorage.setItem(ls_widgetsData_key, JSON.stringify(newWidgetsData));

		return newWidgetsData;
	} catch (e) {
		console.error("Failed while editing widget:", e);
	}
	return oldWidgetsData;
};

export const updateWidgetsData = (newWidgetsData: WidgetData[]) => {
	try {
		localStorage.setItem(ls_widgetsData_key, JSON.stringify(newWidgetsData));
	} catch (e) {
		console.error("Failed while updating widgets data:", e);
	}
};
