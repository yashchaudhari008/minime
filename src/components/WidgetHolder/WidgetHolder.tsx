import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
	addWidget,
	getWidgets,
	WidgetType,
	type WidgetData,
	updateWidgetsData,
	editWidget,
} from "../../utils/widgetsUtils";
import AddNewWidgetBtn from "../widgets/AddNewWidgetBtn/AddNewWidgetBtn";
import BookmarkWidget from "../widgets/BookmarkWidget/BookmarkWidget";
import AddEditWidgetModal from "../AddEditWidgetModal/AddWidgetModal";
import DraggableWidget from "./DraggableWidget";
import styles from "./widgetHolder.module.scss";

const EDIT_WIDGET_EMPTY_STATE = -1;

const WidgetHolder = () => {
	const [showAddNewWidgetModal, setShowAddNewWidgetModal] = useState(false);
	const [widgetsData, setWidgetsData] = useState(getWidgets());
	const [editWidgetIndex, setEditWidgetIndex] = useState(EDIT_WIDGET_EMPTY_STATE);

	const handleWidgetDelete = (index: number) => {
		const updatedWidgets = widgetsData.filter((_, ind) => index !== ind);
		setWidgetsData(updatedWidgets);
		updateWidgetsData(updatedWidgets);
	};
	const handleWidgetEdit = (index: number) => {
		setEditWidgetIndex(index);
		setShowAddNewWidgetModal(true);
	};

	const getWidgetDOM = (widgetData: WidgetData, index: number) => {
		switch (widgetData.type) {
			case WidgetType.BookmarkWidget:
				return (
					<BookmarkWidget
						key={index}
						widgetIndex={index}
						{...widgetData}
						handleWidgetDelete={handleWidgetDelete}
						handleWidgetEdit={handleWidgetEdit}
					/>
				);
			default:
				return null;
		}
	};

	const openAddNewWidgetModal = () => {
		setShowAddNewWidgetModal(true);
	};

	const closeAddNewWidgetModal = () => {
		setShowAddNewWidgetModal(false);
		setEditWidgetIndex(EDIT_WIDGET_EMPTY_STATE);
	};

	const addEditHandler = (
		widgetIndex: number = EDIT_WIDGET_EMPTY_STATE,
		widgetData: WidgetData
	) => {
		if (widgetIndex === EDIT_WIDGET_EMPTY_STATE) {
			setWidgetsData(addWidget(widgetData));
		} else {
			setWidgetsData(editWidget(widgetData, widgetIndex));
		}
		closeAddNewWidgetModal();
	};

	const moveWidget = (fromIndex: number, toIndex: number) => {
		const updatedWidgets = [...widgetsData];
		const [movedWidget] = updatedWidgets.splice(fromIndex, 1);
		updatedWidgets.splice(toIndex, 0, movedWidget);
		setWidgetsData(updatedWidgets);
		updateWidgetsData(updatedWidgets);
	};

	return (
		<div className={styles.widgetHolderWrapper}>
			<div className={styles.widgetHolder}>
				<DndProvider backend={HTML5Backend}>
					{widgetsData.map((widgetData, index) => (
						<DraggableWidget
							key={index}
							index={index}
							onDrop={moveWidget}
							className={`${styles.widget}`}
						>
							{getWidgetDOM(widgetData, index)}
						</DraggableWidget>
					))}
				</DndProvider>
				<AddNewWidgetBtn onClick={openAddNewWidgetModal} />
			</div>

			<AddEditWidgetModal
				isEditModal={editWidgetIndex !== EDIT_WIDGET_EMPTY_STATE}
				show={showAddNewWidgetModal}
				onClose={closeAddNewWidgetModal}
				addEditHandler={addEditHandler.bind(this, editWidgetIndex)}
				widgetToEditData={widgetsData.find((_, index) => editWidgetIndex === index)}
			/>
		</div>
	);
};

export default WidgetHolder;
