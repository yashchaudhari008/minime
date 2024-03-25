import { RefObject, useCallback, useEffect } from "react";

type Props = {
	containerRef: RefObject<HTMLDivElement>;
	closeMenu: () => void;
	showModal: boolean;
};

const useOutsideClick = ({ containerRef, closeMenu, showModal }: Props) => {
	const handleOutsideClick = useCallback(
		(event: Event) => {
			const { target } = event;
			const { current = {} as HTMLDivElement } = containerRef;
			if (typeof current?.contains === "function" && !current?.contains(target as Node)) {
				closeMenu();
			}
		},
		[containerRef, closeMenu]
	);
	useEffect(() => {
		if (showModal) {
			window.addEventListener("click", handleOutsideClick, true);
		} else {
			window.removeEventListener("click", handleOutsideClick, true);
		}

		return () => {
			window.removeEventListener("click", handleOutsideClick, true);
		};
	}, [showModal, handleOutsideClick]);

	return showModal;
};

export default useOutsideClick;
