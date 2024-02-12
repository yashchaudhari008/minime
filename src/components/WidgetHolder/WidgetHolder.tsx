import { FormEvent, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
	addWidget,
	getWidgets,
	WidgetType,
	WidgetData,
	updateWidgetsData,
} from "../../utils/widgetsUtils";
import WidgetForm from "../shared/WidgetForm/WidgetForm";
import AddNewWidgetBtn from "../widgets/AddNewWidgetBtn/AddNewWidgetBtn";
import BookmarkWidget from "../widgets/BookmarkWidget/BookmarkWidget";
import DraggableWidget from "./DraggableWidget";
import styles from "./widgetHolder.module.scss";

const WidgetHolder = () => {
	const [showAddNewWidgetModal, setShowAddNewWidgetModal] = useState(false);
	const [widgetsData, setWidgetsData] = useState(getWidgets());

	const getWidgetDOM = (widgetData: WidgetData, index: number) => {
		switch (widgetData.type) {
			case WidgetType.BookmarkWidget:
				return (
					<BookmarkWidget
						key={index}
						index={index}
						widgetsData={widgetsData}
						setWidgetsData={setWidgetsData}
						widget={widgetData}
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
	};

	const onAddNewWidgetModalSubmit = (nameFromForm: string, linkFromForm: string) => {
		if (!linkFromForm) {
			alert("Link is Invalid!");
			return;
		}

		const newWidgetData: WidgetData = {
			// TODO: Another way to add id to avoid Math.random()
			id: Math.floor(Math.random() * 98 + 1),
			type: WidgetType.BookmarkWidget,
			link: linkFromForm,
			name: nameFromForm,
		};

		setWidgetsData((oldWidgetsData) => [...oldWidgetsData, newWidgetData]);
		addWidget(newWidgetData);
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
			{/* Conditional Rendering to avoid the unnecessary render of below component */}
			{showAddNewWidgetModal && (
				<WidgetForm
					showModal={showAddNewWidgetModal}
					onFormSubmit={onAddNewWidgetModalSubmit}
					onCancelClick={closeAddNewWidgetModal}
				/>
			)}
		</div>
	);
};

export default WidgetHolder;
