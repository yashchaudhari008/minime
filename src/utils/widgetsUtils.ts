export enum WidgetType {
	BookmarkWidget,
  }
  
  export type WidgetData = {
	type: WidgetType;
	name?: string;
	link: string;
	id: string; // Add an id property to uniquely identify widgets
  };
  
  export const getWidgets = (): WidgetData[] => {
	const localStorageWidgetsData = localStorage.getItem("widgetsData");
	const localStorageWidgetsOrder = localStorage.getItem("widgetsOrder");
  
	try {
    if (!localStorageWidgetsData) {
			console.log("No Widget Found!");
			return [];
		}
	  let widgetsData: WidgetData[] = JSON.parse(localStorageWidgetsData || "") || [];
	  
	  // If there is a stored order, sort the widgets accordingly
	  if (localStorageWidgetsOrder) {
		const widgetOrder: string[] = JSON.parse(localStorageWidgetsOrder);
		widgetsData = widgetsData.sort((a, b) => {
		  return widgetOrder.indexOf(a.id) - widgetOrder.indexOf(b.id);
		});
	  }
    
		return widgetsData;
	} catch (e) {
	  console.error("Invalid Widgets Data:", e);
	  return [];
	}
  };
  
  export const addWidget = (newWidgetData: WidgetData) => {
	try {
	  const oldWidgetsData = getWidgets();
	  const newWidgetsData = [...oldWidgetsData, { ...newWidgetData, id: Date.now().toString() }];
	  localStorage.setItem("widgetsData", JSON.stringify(newWidgetsData));
	  updateWidgetOrder(newWidgetsData);
	} catch (e) {
	  console.error("Failed while adding new widget:", e);
	}
  };
  
  
  export const updateWidgetOrder = (widgets: WidgetData[]) => {
	const widgetIds = widgets.map((widget) => widget.id);
	localStorage.setItem("widgetsOrder", JSON.stringify(widgetIds));
  };
  