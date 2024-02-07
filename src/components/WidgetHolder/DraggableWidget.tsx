import React from "react";
import { useDrag, useDrop } from "react-dnd";

type DraggableWidgetProps = React.PropsWithChildren & {
	index: number;
	moveWidget: (fromIndex: number, toIndex: number) => void;
	className: string;
};

const DraggableWidget = ({
	index,
	moveWidget,
	children,
	className,
}: DraggableWidgetProps) => {
	const [{ isDragging }, ref] = useDrag({
		type: "_WIDGET",
		item: { id: index, index },
		collect: (monitor) => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});

	const [, drop] = useDrop({
		accept: "_WIDGET",
		hover: (draggedItem: { index: number }) => {
			if (draggedItem.index !== index) {
				console.log(index);
			}
		},
		drop: (droppedItem: { index: number }) => moveWidget(droppedItem.index, index),
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
