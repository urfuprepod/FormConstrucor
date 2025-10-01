import { useFormConstructor } from "@/app/store/useFormConstructor";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { Row, type FormInstance } from "antd";
import { ThumbsUp, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import FormCol from "../FormCol";
import { useFormStateContext } from "../../context/formStateContext";

type Props = {
    rowIndex: number;
    columns: IConstructorColumn[];
};

const FormRow: FC<Props> = (props) => {
    const { formState, fields, activeDraggableItem } = useFormConstructor();
    const {
        rowIndex,
        columns,
    } = props;

    const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
    const zoneRef = useRef<HTMLDivElement>(null);

    const { isOver, setNodeRef } = useDroppable({
        id: `row-${rowIndex}`,
        disabled: activeDraggableItem.type !== 'col',
    });

    useEffect(() => {
        if (!isOver) {
            setHoverSide(null);
        }
    }, [isOver]);

    const { form } = useFormStateContext();

    const combinedRef = (element: HTMLDivElement | null) => {
        setNodeRef(element);
        zoneRef.current = element;
    };

    useDndMonitor({
        onDragMove(event) {
            const { over, delta, active } = event;

            if (over?.id === `row-${rowIndex}` && delta.x && zoneRef.current) {
                const rect = zoneRef.current.getBoundingClientRect();

                const centerX = rect.left + rect.width / 2;
                const activeDelta = active.rect.current;

                if (!activeDelta.initial || !activeDelta.translated)
                    return setHoverSide(null);

                setHoverSide(
                    activeDelta.translated.left < centerX ? "left" : "right"
                );
            } else if (over?.id !== `row-${rowIndex}`) {
                setHoverSide(null);
            }
        },

        onDragEnd() {
            setHoverSide(null);
        },
    });

    const columnsConfig = useMemo(() => {
        const sorted = [...columns].sort(
            (a, b) => a.orderNumber - b.orderNumber
        );
        const gridStyle = sorted.map((el) => `${el}fr`).join(" ");

        return {
            sortedColumns: [...columns].sort(
                (a, b) => a.orderNumber - b.orderNumber
            ),
            gridStyle,
        };
    }, [columns]);

    if (!form) return null;
    return (
        <div
            key={rowIndex}
            style={{
                gridTemplateColumns: columnsConfig.gridStyle,
                gap: formState.gap,
            }}
            ref={combinedRef}
            className={clsx(styles["draggable-container"], {
                [styles.over]: isOver,
                [styles.left]: hoverSide === "left",
                [styles.right]: hoverSide === "right",
            })}
        >
            {columnsConfig.sortedColumns.map((col) => (
                <FormCol
                    column={col}
                    form={form}
                    field={fields.find((el) => el.columnId === col.id)!}
                    key={col.id}
                />
            ))}

            {/* {sortedItems.map((config, id) => (
                <FieldWithButton
                    style={{
                        border:
                            config.position === activePositionNumber
                                ? "1px solid red"
                                : "",
                    }}
                    isDisabled={id === 0}
                    componentConfiguration={config}
                    form={form}
                    activeDraggableId={activeDraggableId}
                    key={config.position}
                    buttonsBlock={
                        <>
                            <DeleteButton
                                onClick={() => removeField(config.position)}
                                ariaLabel="delete"
                                icon={
                                    <Trash2
                                        size={16}
                                        color="#ffffff"
                                        strokeWidth={1}
                                    />
                                }
                            />
                            <AddButton
                                onClick={() => {
                                    onPickFieldActive(config.position);
                                }}
                                ariaLabel="edit"
                                icon={
                                    <ThumbsUp
                                        size={16}
                                        color="#ffffff"
                                        strokeWidth={1}
                                    />
                                }
                            />
                        </>
                    }
                />
            ))} */}
        </div>
    );
};

export default FormRow;
