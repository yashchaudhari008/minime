import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../../components/widgets/BookmarkWidget/bookmarkWidget.module.scss";

type Props = {
	bookmarkRef: RefObject<HTMLDivElement>;
	openFormModal: () => void;
	handleDeleteWidget: () => void;
};

const MoreOptions = ({ bookmarkRef, openFormModal, handleDeleteWidget }: Props) => {
	const editMenuRef = useRef<HTMLDivElement>(null);
	const [isInViewport, setIsInViewport] = useState(false);

	const handleScroll = useCallback(() => {
		const { left = 0, right = 0 } = bookmarkRef?.current?.getBoundingClientRect() || {};
		const rect = editMenuRef?.current?.getBoundingClientRect();
		const width = rect?.width || 0;
		// Check if the width of More Options menu is in the viewport
		const isVisible = left >= 0 && right + width <= window.innerWidth;
		setIsInViewport(isVisible);
	}, [editMenuRef, bookmarkRef]);

	useEffect(() => {
		handleScroll();

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [bookmarkRef, handleScroll]);

	return (
		<div
			className={`${styles.moreOptions} ${!isInViewport && styles.editMenuToggle}`}
			ref={editMenuRef}
		>
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

export default MoreOptions;
