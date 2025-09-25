import { useFormConstructor } from "@/app/store/useFormConstructor";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { Row, type FormInstance } from "antd";
import { ThumbsUp, Trash2 } from "lucide-react";
import React, { useMemo, useState, type FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useDroppable } from "@dnd-kit/core";

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

    const { isOver, setNodeRef } = useDroppable({
        id: `row-${rowIndex}`,
    });

    const sortedItems = useMemo(() => {
        return [...rowComponents].sort((a, b) => a.position - b.position);
    }, [rowComponents]);

    return (
        <Row
            key={rowIndex}
            gutter={[formState.gap, formState.gap]}
            align="bottom"
            ref={setNodeRef}
            className={clsx(styles["draggable-container"], {
                [styles.over]: isOver,
            })}
        >
            {/* <div
                className={clsx(styles["drag-handle"], {
                    [styles.active]: !!hoverSide,
                    [styles["drag-handle-left"]]: hoverSide === "left",
                    [styles["drag-handle-right"]]: hoverSide === "right",
                })}
            /> */}
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
