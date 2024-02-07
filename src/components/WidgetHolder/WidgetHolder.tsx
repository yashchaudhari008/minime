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
import Modal from "../shared/Modal/Modal";
import InputField from "../shared/InputField/InputField";
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
				return <BookmarkWidget key={index} {...widgetData} />;
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

	const onAddNewWidgetModalSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const nameFromForm = formData.get("name")?.toString();
		const linkFromForm = formData.get("url")?.toString() || "";

		if (!linkFromForm) {
			alert("Link is Invalid!");
			return;
		}

		const newWidgetData: WidgetData = {
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

			<Modal showModal={showAddNewWidgetModal} headerText="New Bookmark">
				<form className={styles.modalContent} onSubmit={onAddNewWidgetModalSubmit}>
					<div className={styles.formInputHolder}>
						<InputField id="name" label="Name" />
					</div>
					<div className={styles.formInputHolder}>
						<InputField id="url" label="Link" type="url" required />
					</div>
					<div className={styles.modalFooter}>
						<button type="button" onClick={closeAddNewWidgetModal}>
							Cancel
						</button>
						<button type="submit">Add</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default WidgetHolder;
