import React, { FormEvent, useState } from "react";
import { addWidget, getWidgets, WidgetType } from "../../utils/widgetsUtils";
import type { WidgetData } from "../../utils/widgetsUtils";
import Modal from "../shared/Modal/Modal";
import InputField from "../shared/InputField/InputField";
import AddNewWidgetBtn from "../widgets/AddNewWidgetBtn/AddNewWidgetBtn";
import BookmarkWidget from "../widgets/BookmarkWidget/BookmarkWidget";
import styles from "./widgetHolder.module.scss";

const WidgetHolder = () => {
	const [showAddNewWidgetModal, setShowAddNewWidgetModal] = useState(false);

	const widgetsData = getWidgets();

	const getWidgetDOM = (widgetData: WidgetData, index: number) => {
		switch (widgetData.type) {
			case WidgetType.BookmarkWidget:
				return <BookmarkWidget key={index} {...widgetData} />;
		}
	};

	const openAddNewWidgetModal = () => {
		setShowAddNewWidgetModal(true);
	};

	const closeAddNewWidgetModal = () => {
		setShowAddNewWidgetModal(false);
	};

	const onModalSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const nameFromForm = formData.get("name")?.toString();
		const linkFromForm = formData.get("url")?.toString() || "";

		if (!linkFromForm) {
			alert("Link is Invalid!");
			return;
		}

		addWidget({
			widgetIndex: 0,
			type: WidgetType.BookmarkWidget,
			link: linkFromForm,
			name: nameFromForm,
		});
		location.reload();
		closeAddNewWidgetModal();
	};

	return (
		<div className={styles.widgetHolderWrapper}>
			<div className={styles.widgetHolder}>
				{widgetsData.map((widgetData, index) => {
					return (
						<div key={index} className={styles.widget}>
							{getWidgetDOM(widgetData, index)}
						</div>
					);
				})}
				<AddNewWidgetBtn onClick={openAddNewWidgetModal} />
			</div>

			<Modal showModal={showAddNewWidgetModal} headerText="New Bookmark">
				<form className={styles.modalContent} onSubmit={onModalSubmit}>
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
