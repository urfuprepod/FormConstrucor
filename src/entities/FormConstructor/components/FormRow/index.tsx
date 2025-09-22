import { useFormConstructor } from "@/app/store/useFormConstructor";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { Row, type FormInstance } from "antd";
import { ThumbsUp, Trash2 } from "lucide-react";
import React, { useState, type FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

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

    return (
        <Row
            key={rowIndex}
            gutter={[formState.gap, formState.gap]}
            align="bottom"
            className={styles["draggable-container"]}
        >
            <div
                className={clsx(styles["drag-handle"], {
                    [styles.active]: !!hoverSide,
                    [styles["drag-handle-left"]]: hoverSide === "left",
                    [styles["drag-handle-right"]]: hoverSide === "right",
                })}
            />
            {rowComponents.map((config) => (
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
