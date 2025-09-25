import { useFormConstructor } from "@/app/store/useFormConstructor";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import {
    isComponentConfigWithState,
    type ComponentConfigWithState,
    type SettingsFieldsStatic,
} from "../types/constructor";
import { checkSideTypeByItemAndCenterPosition } from "../methods";
import type { DraggableType } from "../types/draggable";

export const useDraggableControl = () => {
    const [activeDraggableId, setActiveDraggableId] = useState<string | null>(
        null
    );

    const { pushAndReplaceField } = useFormConstructor();

    const handleDragStart = (event: DragStartEvent): void => {
        setActiveDraggableId(event.active.id as string);
    };

    const handleRemoveDraggableId = () => {
        setActiveDraggableId(null);
    };

    const callbackDict = useMemo<
        Record<
            string,
            (
                data: ComponentConfigWithState<SettingsFieldsStatic>,
                objectId?: string,
                zoneId?: string,
                direction?: DraggableType,
                oldPosition?: number
            ) => void
        >
    >(() => {
        return {
            create: (data: ComponentConfigWithState<SettingsFieldsStatic>) =>
                pushAndReplaceField(data),
            row: (
                data: ComponentConfigWithState<SettingsFieldsStatic>,
                objectId?: string,
                zoneId?: string,
                direction?: DraggableType,
                oldPosition?: number
            ) => {
                if (!objectId || !zoneId) return;
                const actualRowNumber = +zoneId.split("-").at(-1)!;

                pushAndReplaceField(
                    data,
                    actualRowNumber,
                    direction ?? "endRow",
                    objectId.includes("p") ? undefined : oldPosition
                );
            },
        };
    }, [pushAndReplaceField]);

    const handleDragEnd = (event: DragEndEvent): void => {
        handleRemoveDraggableId();
        if (event.over === null) {
            return;
        }
        const { data } = event.active;
        const overId = String(event.over.id);

        const centerDrop = event.over.rect.left + event.over.rect.width / 2;
        const variant = checkSideTypeByItemAndCenterPosition(event, centerDrop);

        if (isComponentConfigWithState(data.current?.data)) {
            Object.entries(callbackDict).find(([key]) =>
                overId.includes(key)
            )?.[1](
                data.current.data,
                event.active.id as string,
                overId,
                variant,
                data.current.data.position
            );
        }
    };

    return {
        handleDragEnd,
        handleDragStart,
        activeDraggableId,
        handleRemoveDraggableId,
    };
};
