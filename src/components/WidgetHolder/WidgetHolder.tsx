import { FormEvent, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addWidget, getWidgets, WidgetType, WidgetData, updateWidgetOrder } from "../../utils/widgetsUtils";
import Modal from "../shared/Modal/Modal";
import InputField from "../shared/InputField/InputField";
import AddNewWidgetBtn from "../widgets/AddNewWidgetBtn/AddNewWidgetBtn";
import BookmarkWidget from "../widgets/BookmarkWidget/BookmarkWidget";
import styles from "./widgetHolder.module.scss";

// Define a function to generate the appropriate DOM representation for each widget type.
// This function is used within the DraggableWidget component to render the correct widget.
const getWidgetDOM = (widgetData: WidgetData, index: number) => {
    // Switch statement to handle different widget types
    switch (widgetData.type) {
        // For BookmarkWidget type, render a BookmarkWidget component with unique key and props.
        case WidgetType.BookmarkWidget:
            return <BookmarkWidget key={index} {...widgetData} />;
    }
};

const DraggableWidget = ({
    widgetData,
    index,
    moveWidget,
}: {
    widgetData: WidgetData;
    index: number;
    moveWidget: (fromIndex: number, toIndex: number) => void;
}) => {
    const [, ref] = useDrag({
        type: "WIDGET",
        item: { id: index, index },
    });

    const [, drop] = useDrop({
        accept: "WIDGET",
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                moveWidget(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className={`${styles.widget}`}>
            {getWidgetDOM(widgetData, index)}
        </div>
    );
};

const WidgetHolder = () => {
    const [showAddNewWidgetModal, setShowAddNewWidgetModal] = useState(false);
    const [widgetsData, setWidgetsData] = useState(getWidgets());

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
            id: ""
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
        updateWidgetOrder(updatedWidgets);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.widgetHolderWrapper}>
                <div className={styles.widgetHolder}>
                    {widgetsData.map((widgetData, index) => (
                        <DraggableWidget
                            key={index}
                            widgetData={widgetData}
                            index={index}
                            moveWidget={moveWidget}
                        />
                    ))}
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
        </DndProvider>
    );
};

export default WidgetHolder;
