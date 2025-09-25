import { useFormConstructor } from "@/app/store/useFormConstructor";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { Row, type FormInstance } from "antd";
import { ThumbsUp, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState, type FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useDndMonitor, useDroppable, type DragMoveEvent } from "@dnd-kit/core";

type Props = {
    rowIndex: number;
    rowComponents: ComponentConfigWithStateArray;
    form: FormInstance;
    activePositionNumber: number | null;
    onPickFieldActive: (val: number) => void;
};

const FormRow: FC<Props> = (props) => {
    const { formState, removeField } = useFormConstructor();
    const {
        rowComponents,
        rowIndex,
        form,
        onPickFieldActive,
        activePositionNumber,
    } = props;

    const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
    const zoneRef = useRef<HTMLDivElement>(null);
    const [isDisabledRow, setIsDisabledRow] = useState<boolean>(false);

    const { isOver, setNodeRef } = useDroppable({
        id: `row-${rowIndex}`,
        disabled: isDisabledRow,
    });

    useEffect(() => {
        if (!isOver) {
            setHoverSide(null);
            setIsDisabledRow(false);
        }
    }, [isOver]);

    const sortedItems = useMemo(() => {
        return [...rowComponents].sort((a, b) => a.position - b.position);
    }, [rowComponents]);

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
            setIsDisabledRow(false);
        },
    });

    return (
        <Row
            key={rowIndex}
            gutter={[formState.gap, formState.gap]}
            align="bottom"
            ref={combinedRef}
            className={clsx(styles["draggable-container"], {
                [styles.over]: isOver,
                [styles.left]: hoverSide === "left",
                [styles.right]: hoverSide === "right",
            })}
        >
            {sortedItems.map((config) => (
                <FieldWithButton
                    style={{
                        border:
                            config.position === activePositionNumber
                                ? "1px solid red"
                                : "",
                    }}
                    componentConfiguration={config}
                    form={form}
                    key={config.position}
                    buttonsBlock={
                        <>
                            <DeleteButton
                                onClick={() => removeField(config.position)}
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
            ))}
        </Row>
    );
};

export default FormRow;
