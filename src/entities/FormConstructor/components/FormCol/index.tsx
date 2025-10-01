import { useFormConstructor } from "@/app/store/useFormConstructor";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import type { FormInstance } from "antd";
import { ThumbsUp, Trash2 } from "lucide-react";
import React, { type FC } from "react";

type Props = {
    column: IConstructorColumn;
    field: ComponentConfigWithStateArray[number];
    form: FormInstance;
    isDisabled?: boolean;
};

// в колонке может быть только одно поле формы, лучше передать пропсом, чтобы снизить количество useMemo и подписок на глобал стейт
const FormCol: FC<Props> = (props) => {
    const { column, field: config, form, isDisabled } = props;

    const {
        removeField,
        activeDraggableId,
        activePositionNumber,
        updatePositionNumber,
    } = useFormConstructor();

    return (
        <div>
            <FieldWithButton
                style={{
                    border:
                        config.position === activePositionNumber
                            ? "1px solid red"
                            : "",
                }}
                isDisabled={!!isDisabled}
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
                                updatePositionNumber(config.position);
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
        </div>
    );
};

export default FormCol;
