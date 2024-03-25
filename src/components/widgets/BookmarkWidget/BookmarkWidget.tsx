import { SyntheticEvent, useRef, useState } from "react";
import { type WidgetData, updateWidgetsData } from "../../../utils/widgetsUtils";
import { getFaviconLink } from "./bookmarkUtils";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideClick from "../../../Hooks/useOutsideClick";
import WidgetForm from "../../shared/WidgetForm/WidgetForm";
import MoreOptions from "../../MoreOptions/MoreOptions";
import styles from "./bookmarkWidget.module.scss";

type BookmarkWidgetProps = {
	index: number;
	widgetsData: Array<WidgetData>;
	setWidgetsData: (widgetsData: Array<WidgetData>) => void;
};

const BookmarkWidget = ({
	widgetsData,
	setWidgetsData,
	index,
	type,
	link,
	name,
}: BookmarkWidgetProps & WidgetData) => {
	const [showModal, setShowModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const bookmarkRef = useRef<HTMLDivElement>(null);

	const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
		window.open(link, "_self");
		e.currentTarget.blur();
	};

	const openMenu = (e: SyntheticEvent) => {
		e.stopPropagation();
		setShowModal(true);
	};

	const closeMenu = () => {
		setShowModal(false);
	};

	const openFormModal = () => {
		setShowFormModal(true);
		closeMenu();
	};
	const closeFormModal = () => {
		setShowFormModal(false);
	};

	// Added this to stop propogation
	const handleStopPropogation = (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
	};

	useOutsideClick({
		containerRef,
		closeMenu,
		showModal,
	});

	const handleDeleteWidget = () => {
		const updatedWidgets = widgetsData.filter((_, ind) => index !== ind);
		setWidgetsData(updatedWidgets);
		updateWidgetsData(updatedWidgets);
		closeMenu();
	};
	// TODO: simplify the edit logic
	const handleEditWidget = (name: string, link: string) => {
		const updatedWidget = { type, name, link };
		// Remove the current widget from the widgetsData
		const newWidgets = widgetsData.filter((_, ind) => index !== ind);
		// Insert the updated widget into newWidgets
		newWidgets.splice(index, 0, updatedWidget);
		// update the state
		setWidgetsData(newWidgets);
		// update the local storage
		updateWidgetsData(newWidgets);
		closeFormModal();
	};

	return (
		<>
			<div className={styles.bookmarkWidgetContainer} ref={bookmarkRef}>
				<button className={styles.bookmarkWidget} onClick={onClickHandler}>
					<div className={styles.faviconHolder}>
						<img src={getFaviconLink(link)} className={styles.favicon} />
					</div>
					<span className={styles.nameWrapper}>{name || link}</span>
					<div className={styles.editBookmarkWidget} onClick={(e) => openMenu(e)}>
						<FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
						<div onClick={(e) => handleStopPropogation(e)} ref={containerRef}>
							{showModal && (
								<MoreOptions
									bookmarkRef={bookmarkRef}
									openFormModal={openFormModal}
									handleDeleteWidget={handleDeleteWidget}
								/>
							)}
						</div>
					</div>
				</button>
			</div>
			{/* Conditional Rendering to avoid the unnecessary render of below component */}
			{showFormModal && (
				<WidgetForm
					isEditMode={true}
					showModal={showFormModal}
					currentName={name}
					currentLink={link}
					onCancelClick={closeFormModal}
					onFormSubmit={handleEditWidget}
				/>
			)}
		</>
	);
};

export default BookmarkWidget;
