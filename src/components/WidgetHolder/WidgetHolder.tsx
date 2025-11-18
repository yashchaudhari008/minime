import { useState } from "react";
import classNames from "classnames";
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
import NotepadWidget from "../widgets/NotepadWidget/NotepadWidget";
import NotepadWidgetModal from "../NotepadWidgetModal/NotepadWidgetModal";
import styles from "./widgetHolder.module.scss";

const EDIT_WIDGET_EMPTY_STATE = -1;

type WidgetHolderProps = {
	searchValue: string;
}

const WidgetHolder = ({ searchValue }: WidgetHolderProps) => {
	const [showAddNewWidgetModal, setShowAddNewWidgetModal] = useState(false);
	const [showNotepadWidgetModal, setShowNotepadWidgetModal] = useState(false);
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

	const getVisibleWidgets = () => {
		if (searchValue.length > 0) return widgetsData.filter((w) => w.name?.includes(searchValue) || w.link.includes(searchValue))
		return widgetsData;
	}

	const openNotepadWidgetModal = () => {
		setShowNotepadWidgetModal(true);
	}

	const closeNotepadWidgetModal = () => {
		setShowNotepadWidgetModal(false);
	}

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
				<NotepadWidget onClick={openNotepadWidgetModal} />
				<DndProvider backend={HTML5Backend}>
					{getVisibleWidgets().map((widgetData, index) => {
						const realIndex = widgetsData.indexOf(widgetData);
						const widgetClass = classNames(styles.widget, {
							[styles.fixedSizeWidget]: !widgetData?.name,
						});
						return (
							<DraggableWidget
								key={index}
								index={realIndex}
								onDrop={moveWidget}
								className={widgetClass}
							>
								{getWidgetDOM(widgetData, realIndex)}
							</DraggableWidget>
						);
					})}
				</DndProvider>
				<AddNewWidgetBtn onClick={openAddNewWidgetModal} />
				{searchValue.length > 0 && getVisibleWidgets().length === 0 && (
					<h2>Press ENTER to search on google.</h2>
				)}
			</div>

			<AddEditWidgetModal
				isEditModal={editWidgetIndex !== EDIT_WIDGET_EMPTY_STATE}
				show={showAddNewWidgetModal}
				onClose={closeAddNewWidgetModal}
				addEditHandler={addEditHandler.bind(this, editWidgetIndex)}
				widgetToEditData={widgetsData.find((_, index) => editWidgetIndex === index)}
			/>
			<NotepadWidgetModal
				show={showNotepadWidgetModal}
				onClose={closeNotepadWidgetModal}
			/>

		</div>
	);
};

export default WidgetHolder;
