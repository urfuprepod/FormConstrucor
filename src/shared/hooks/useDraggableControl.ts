import { useFormConstructor } from "@/app/store/useFormConstructor";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import {
    isComponentConfigWithState,
    type ComponentConfig,
    type ComponentConfigWithState,
    type SettingsFieldsStatic,
} from "../types/constructor";

export const useDraggableControl = () => {
    const [activeDraggableId, setActiveDraggableId] = useState<string | null>(
        null
    );

    const { pushNewField } = useFormConstructor();

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
                direction?: "startRow" | "endRow"
            ) => void
        >
    >(() => {
        return {
            create: (data: ComponentConfigWithState<SettingsFieldsStatic>) =>
                pushNewField(data),
            row: (
                data: ComponentConfigWithState<SettingsFieldsStatic>,
                objectId?: string,
                zoneId?: string,
                direction?: "startRow" | "endRow"
            ) => {
                if (!objectId || !zoneId) return;
                if (objectId.includes("p")) {
                    const actualRowNumber = +zoneId.split("-").at(-1)!;

                    pushNewField(data, actualRowNumber, direction ?? "endRow");
                }
            },
        };
    }, [pushNewField]);

    const handleDragEnd = (event: DragEndEvent): void => {
        handleRemoveDraggableId();
        if (event.over === null) {
            return;
        }
        const { data } = event.active;
        const overId = String(event.over.id);

        const centerDrop = event.over.rect.left + event.over.rect.width / 2;
        const variant = event.delta.x < centerDrop ? "startRow" : "endRow";

        console.log(centerDrop,  event.delta.x, variant)

        if (isComponentConfigWithState(data.current?.data)) {
            Object.entries(callbackDict).find(([key]) =>
                overId.includes(key)
            )?.[1](
                data.current.data,
                event.active.id as string,
                overId,
                variant
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
