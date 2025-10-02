import { useFormConstructor } from "@/app/store/useFormConstructor";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { FormInstance } from "antd";
import clsx from "clsx";
import { ThumbsUp, Trash2 } from "lucide-react";
import { type FC } from "react";
import styles from "./styles.module.css";
import FormGrid from "../FormGrid";

type Props = {
    column: IConstructorColumn;
    field?: ComponentConfigWithStateArray[number];
    form: FormInstance;
    grid?: IConstructorGrid;
};

const FormCol: FC<Props> = (props) => {
    const { column, field: config, form, grid } = props;

    const { removeField, activeFieldId, updateFieldId, activeDraggableItem } =
        useFormConstructor();

    const columnId = `col/${column.id}`;

    const isDisabled = activeDraggableItem.id === column.id;

    const {
        setNodeRef: setDraggableRef,
        isDragging,
        attributes,
        listeners,
    } = useDraggable({
        id: columnId,
    });

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
        id: columnId,
        disabled: isDisabled,
    });

    const ref = (node: HTMLElement | null) => {
        setDraggableRef(node);
        setDroppableRef(node);
    };

    return (
        <div
            ref={ref}
            {...attributes}
            {...listeners}
            className={clsx(styles["draggable-element"], {
                [styles.draggable]: isDragging,
            })}
        >
            {isOver && !isDisabled && <div className={styles["spray"]} />}

            {config && (
                <FieldWithButton
                    style={{
                        border:
                            config.id === activeFieldId ? "1px solid red" : "",
                    }}
                    componentConfiguration={config}
                    form={form}
                    key={config.id}
                    buttonsBlock={
                        <>
                            <DeleteButton
                                onClick={() => removeField(config.id)}
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
                                    updateFieldId(config.id);
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
            )}
            {grid && <FormGrid grid={grid} />}
        </div>
    );
};

export default FormCol;
