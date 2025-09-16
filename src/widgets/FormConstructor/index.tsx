import { Button, Form } from "antd";
import { type FC } from "react";
import { downloadJson } from "@/shared/methods";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import { ThumbsUp, Trash2 } from "lucide-react";
import styles from "./styles.module.css";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";

type Props = {
    formComponentsState: ComponentConfigWithStateArray;
    onRemoveField: (positionNumber: number) => void;
    onPickFieldActive: (positionNumber: number) => void;
    isDisabled?: boolean;
    activePositionNumber: number | null;
};

const FormConstructor: FC<Props> = (props) => {
    const {
        formComponentsState,
        isDisabled,
        onPickFieldActive,
        onRemoveField,
        activePositionNumber,
    } = props;

    const [form] = Form.useForm();

    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            onClick={(e) => e.stopPropagation()}
            disabled={!!isDisabled}
            wrapperCol={{ span: 8 }}
        >
            {formComponentsState.map((config) => (
                <FieldWithButton
                    style={{
                        border:
                            config.position === activePositionNumber
                                ? "1px solid red"
                                : "",
                    }}
                    Component={config.Component}
                    fieldValues={config.data}
                    key={config.position}
                    buttonsBlock={
                        <>
                            <DeleteButton
                                onClick={() => onRemoveField(config.position)}
                                icon={
                                    <Trash2
                                        size={16}
                                        color="#ffffff"
                                        strokeWidth={1}
                                    />
                                }
                            />
                            <AddButton
                                onClick={(e) => {
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

            <Button
                onClick={() => downloadJson({ fields: formComponentsState })}
                type="primary"
                htmlType="submit"
            >
                Скачать форму
            </Button>
        </Form>
    );
};

export default FormConstructor;
