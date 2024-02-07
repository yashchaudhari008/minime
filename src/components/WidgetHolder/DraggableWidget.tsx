import React from "react";
import { useDrag, useDrop } from "react-dnd";

type DraggableWidgetProps = React.PropsWithChildren & {
	index: number;
	onDrop: (fromIndex: number, toIndex: number) => void;
	className: string;
};

const DraggableWidget = ({
	index,
	onDrop,
	children,
	className,
}: DraggableWidgetProps) => {
	const [{ isDragging }, ref] = useDrag({
		type: "_WIDGET",
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: "_WIDGET",
		drop: (droppedItem: { index: number }) => onDrop(droppedItem.index, index),
	});

	return (
		<div
			ref={(node) => ref(drop(node))}
			style={{ opacity: isDragging ? 0.3 : 1 }}
			className={className}
		>
			{children}
		</div>
	);
};

export default DraggableWidget;
