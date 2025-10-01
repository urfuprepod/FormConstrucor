import { useFormConstructor } from "@/app/store/useFormConstructor";
import {
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";
import {
    isComponentConfigWithState,
    type ComponentConfigWithState,
    type SettingsFieldsStatic,
} from "../types/constructor";
import {
    checkSideTypeByItemAndCenterPosition,
    findPreIndexOnRowPush,
} from "../methods";
import {
    isDraggableItem,
    isValidToUpdateCol,
    type DraggableType,
} from "../types/draggable";

export const useDraggableControl = () => {
    const {
        pushAndReplaceField,
        updateDraggableItem,
        fields,
        updateCol,
        updateGrid,
    } = useFormConstructor();

    const handleDragStart = (event: DragStartEvent): void => {
        const [activeType, activeId] = (event.active.id as string).split("-");
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
        const gridId = identificator.split("-").at(-1);
        if (id === "col") {
            return updateCol({ gridId });
        }
        const currentColId = id.split("-").at(-1);
        // сценарий мутации старой колонки
        if (isValidToUpdateCol(data)) {
            updateCol(data, currentColId);
        }
    };

    const handleColOnColRefresh = (event: DragEndEvent): void => {
        const { data, id } = event.active;
        const identificator = event.over?.id;
        if (typeof id !== "string" || typeof identificator !== "string") return;
    };

    const handleColumnDrop = (event: DragEndEvent): void => {
        const { data, id } = event.active;
        const identificator = event.over?.id;
        if (typeof id !== "string" || typeof identificator !== "string") return;
        const columnId = identificator.split("-").at(-1);
        if (!columnId) return;

        // добавляем сетку в колонку
        if (id === "grid") {
            return updateGrid({
                id: new Date().toISOString(),
                colId: columnId,
            });
        }
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
        const { data, id } = event.active;
        const overId = String(event.over.id);
        const activeId = String(id);

        if (overId.includes("grid")) return handleGridDrop(event);
        if (overId.includes("col") && !activeId.includes("col"))
            return handleColumnDrop(event);

        const centerDrop = event.over.rect.left + event.over.rect.width / 2;
        const variant = checkSideTypeByItemAndCenterPosition(event, centerDrop);
    };

    return {
        handleDragEnd,
        handleDragStart,
        handleRemoveDraggableItem,
        sensors,
    };
};
