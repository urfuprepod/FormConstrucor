import { type FC, type PropsWithChildren } from "react";
import styles from "./style.module.css";
import { useFormConstructor } from "@/app/store/useFormConstructor";
import type { DraggableItem } from "@/shared/types/draggable";

const overlayTitleDict: Record<Exclude<DraggableItem["type"], null>, string> = {
    col: "Колонка",
    field: "Элемент",
    grid: "Сетка",
};

const DragOverlay: FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const { activeDraggableItem } = useFormConstructor();

    return (
        <div className={styles.overlay}>
            {overlayTitleDict[activeDraggableItem.type ?? "field"]} {children}
        </div>
    );
};

export default DragOverlay;
