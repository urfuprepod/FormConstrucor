import { type FC, type PropsWithChildren } from "react";
import styles from "./styles.module.css";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";

type Props = {
    id: string;
};

const EditingItem: FC<PropsWithChildren<Props>> = (props) => {
    const { children, id } = props;

    const { setNodeRef, isDragging, attributes, listeners } = useDraggable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={clsx(styles.editing, { [styles.active]: isDragging })}
        >
            {children}
        </div>
    );
};

export default EditingItem;
