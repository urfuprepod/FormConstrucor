import { useFormConstructor } from "@/app/store/useFormConstructor";
import {
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
    type Over,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import {
    isComponentConfigWithState,
    type ComponentConfigWithState,
    type SettingsFieldsStatic,
} from "../types/constructor";
import {
    checkSideTypeByItemAndCenterPosition,
    findPreIndexOnRowPush,
} from "../methods";
import type { DraggableType } from "../types/draggable";

type DraggableCallbackDictionary = Record<
    string,
    (
        data: ComponentConfigWithState<SettingsFieldsStatic>,
        over?: Over,
        oldPosition?: number,
        direction?: DraggableType
    ) => void
>;

export const useDraggableControl = () => {
    const [activeDraggableId, setActiveDraggableId] = useState<string | null>(
        null
    );

    const { pushAndReplaceField, fields } = useFormConstructor();

    const handleDragStart = (event: DragStartEvent): void => {
        setActiveDraggableId(event.active.id as string);
    };

    const handleRemoveDraggableId = () => {
        setActiveDraggableId(null);
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

    const callbackDict = useMemo<DraggableCallbackDictionary>(() => {
        return {
            create: (data: ComponentConfigWithState<SettingsFieldsStatic>) =>
                pushAndReplaceField(data),
            row: (
                data: ComponentConfigWithState<SettingsFieldsStatic>,
                over?: Over,
                oldPosition?: number,
                direction?: DraggableType
            ) => {
                if (!over?.id) return;

                const rowNumber = +(String(over.id).split("-").at(-1) ?? 0);
                const drt = direction ?? "endRow";

                pushAndReplaceField(
                    data,
                    rowNumber,
                    drt,
                    oldPosition === undefined || oldPosition < 0
                        ? undefined
                        : {
                              oldPositionId: oldPosition,
                              endPositionId: findPreIndexOnRowPush(
                                  rowNumber,
                                  fields,
                                  drt
                              ),
                          }
                );
            },
            field: (
                data: ComponentConfigWithState<SettingsFieldsStatic>,
                over?: Over,
                oldPosition?: number
            ) => {
                if (!over?.data.current || !("rowNumber" in over.data.current))
                    return;

                const { rowNumber } = over.data.current;
                if (typeof rowNumber !== "number") return;

                const endPositionId = +(String(over.id).split("-").at(-1) ?? 0);

                pushAndReplaceField(data, rowNumber, "startRow", {
                    oldPositionId:
                        oldPosition === undefined || oldPosition < 0
                            ? undefined
                            : oldPosition,
                    endPositionId,
                });
            },
        };
    }, [pushAndReplaceField, fields]);

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
                event.over,
                data.current.data.position,
                variant
            );
        }
    };

    return {
        handleDragEnd,
        handleDragStart,
        activeDraggableId,
        handleRemoveDraggableId,
        sensors,
    };
};
