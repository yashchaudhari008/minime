import { SyntheticEvent, useState } from "react";
import { type WidgetData, updateWidgetsData } from "../../../utils/widgetsUtils";
import { getFaviconLink } from "./bookmarkUtils";
import { faPen, faXmark, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./bookmarkWidget.module.scss";
import WidgetForm from "../../shared/WidgetForm/WidgetForm";

type BookmarkWidgetProps = {
	index: number;
	widgetsData: Array<WidgetData>;
	setWidgetsData: (widgetsData: Array<WidgetData>) => void;
	widget: WidgetData;
};

const BookmarkWidget = ({
	widgetsData,
	setWidgetsData,
	index,
	widget,
}: BookmarkWidgetProps) => {
	const { name, link } = widget;

	const [showModal, setShowModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);

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

	const handleDeleteWidget = () => {
		const updatedWidgets = widgetsData.filter((_, ind) => index !== ind);
		setWidgetsData(updatedWidgets);
		updateWidgetsData(updatedWidgets);
		closeMenu();
	};
	// TODO: simplify the edit logic
	const handleEditWidget = (name: string, link: string) => {
		const updatedWidget = { ...widget, name, link };
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

	const moreOptionsDom = () => {
		return (
			// TODO: try another logic to close the modal instead of onMouseLeave
			<div className={styles.moreOptions} onMouseLeave={closeMenu}>
				<div className={styles.moreOptionButton} onClick={openFormModal}>
					<FontAwesomeIcon icon={faPen} className={styles.icon} />
					<span className={styles.name}>Edit</span>
				</div>
				<div className={styles.moreOptionButton} onClick={handleDeleteWidget}>
					<FontAwesomeIcon icon={faXmark} className={styles.icon} />
					<span className={styles.name}>Delete</span>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.bookmarkWidgetContainer}>
			<button className={styles.bookmarkWidget} onClick={onClickHandler}>
				<div className={styles.faviconHolder}>
					<img src={getFaviconLink(link)} className={styles.favicon} />
				</div>
				<span className={styles.nameWrapper}>{name || link}</span>
				<div className={styles.editBookmarkWidget} onClick={(e) => openMenu(e)}>
					<FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
				</div>
			</button>
			{showModal && moreOptionsDom()}
			{/* Conditional Rendering to avoid the unnecessary render of below component */}
			{showFormModal && (
				<WidgetForm
					showModal={showFormModal}
					currentName={name}
					currentLink={link}
					onCancelClick={closeFormModal}
					onFormSubmit={handleEditWidget}
				/>
			)}
		</div>
	);
};

export default BookmarkWidget;
