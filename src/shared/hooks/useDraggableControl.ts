import { useFormConstructor } from "@/app/store/useFormConstructor";
import { v4 as uuidv4 } from "uuid";
import {
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";
import { isComponentConfigWithState } from "../types/constructor";
import { checkSideTypeByItemAndCenterPosition } from "../methods";
import {
    isDraggableItem,
    isValidToUpdateCol,
    type DraggableType,
} from "../types/draggable";

export const useDraggableControl = () => {
    const {
        pushAndReplaceField,
        updateDraggableItem,
        updateCol,
        updateGrid,
        refreshCol,
        pushOnRow,
    } = useFormConstructor();

    const handleDragStart = (event: DragStartEvent): void => {
        const [activeType, activeId] = (event.active.id as string).split("/");
        updateDraggableItem(
            isDraggableItem(activeType)
                ? { type: activeType, id: activeId || null }
                : { type: null, id: null }
        );
    };

    const handleRemoveDraggableItem = () => {
        updateDraggableItem({
            type: null,
            id: null,
        });
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    const handleGridDrop = (event: DragEndEvent): void => {
        const { data, id } = event.active;
        const identificator = event.over?.id;
        if (typeof id !== "string" || typeof identificator !== "string") return;
        // сценарий добавления новой колонки
        const gridId = identificator.split("/")[1];
        console.log("упало в грид", id);

        if (id === "col") {
            return updateCol({ gridId });
        }
        const currentColId = id.split("/")[1];
        // сценарий мутации старой колонки
        if (isValidToUpdateCol(data)) {
            updateCol(data, currentColId);
        }
    };

    const handleColOnColRefresh = (event: DragEndEvent): void => {
        const { id } = event.active;
        const identificator = event.over?.id;
        if (typeof id !== "string" || typeof identificator !== "string") return;
        const targetColumnId = identificator.split("/")[1];
        if (!targetColumnId) return;
        const columnId = event.active.id.toString().split("/")[1];
        refreshCol(targetColumnId, columnId);
    };

    // нельзя запушить в строку, если в ней нет элементов - строка просто не будет показываться
    const handleRowDrop = (
        event: DragEndEvent,
        direction: DraggableType
    ): void => {
        const { id } = event.active;
        const identificator = event.over?.id;
        if (typeof id !== "string" || typeof identificator !== "string") return;

        console.log(identificator, 'chuvak')

        const gridId = identificator.split("/")[2];
        if (!gridId) return;
        const columnId = event.active.id.toString().split("/")[1];
        pushOnRow(direction, gridId, columnId);
    };

    const handleColumnDrop = (event: DragEndEvent): void => {
        const { data, id } = event.active;
        const identificator = event.over?.id;
        if (typeof id !== "string" || typeof identificator !== "string") return;
        const columnId = identificator.split("/")[1];
        if (!columnId) return;

        // добавляем сетку в колонку
        if (id === "grid") {
            return updateGrid({
                id: uuidv4(),
                colId: columnId,
            });
        }
        // добавляем поле в колонку
        if (!isComponentConfigWithState(data.current?.data)) return;
        const value = data.current.data;
        
        pushAndReplaceField(
            value,
            columnId,
            value.columnId === "palette" ? undefined : value.columnId
        );
    };

    const handleDragEnd = (event: DragEndEvent): void => {
        handleRemoveDraggableItem();
        if (event.over === null) {
            return;
        }
        const { id } = event.active;
        const overId = String(event.over.id);
        const activeId = String(id);

        if (overId.includes("grid")) return handleGridDrop(event);
        if (overId.includes("col")) {
            const isRefreshCol = activeId.includes("col");
            return isRefreshCol
                ? handleColOnColRefresh(event)
                : handleColumnDrop(event);
        }

        const centerDrop = event.over.rect.left + event.over.rect.width / 2;
        const variant = checkSideTypeByItemAndCenterPosition(event, centerDrop);
        handleRowDrop(event, variant);
    };

    return {
        handleDragEnd,
        handleDragStart,
        handleRemoveDraggableItem,
        sensors,
    };
};
