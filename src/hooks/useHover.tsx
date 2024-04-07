import { useRef, useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHover = (): [React.RefObject<any>, boolean] => {
	const ref = useRef<HTMLElement>(null);

	const [isHovered, setIsHovered] = useState(false);

	const enterHandler = () => setIsHovered(true);
	const leaveHandler = () => setIsHovered(false);

	useEffect(() => {
		const currentElement = ref.current;
		currentElement?.addEventListener("mouseenter", enterHandler);
		currentElement?.addEventListener("mouseleave", leaveHandler);
		return () => {
			currentElement?.removeEventListener("mouseenter", enterHandler);
			currentElement?.removeEventListener("mouseleave", leaveHandler);
		};
	}, []);

	return [ref, isHovered];
};

export default useHover;
