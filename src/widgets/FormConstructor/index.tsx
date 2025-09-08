import { Button, Form } from "antd";
import { useMemo, type FC } from "react";
import { downloadJson } from "@/shared/methods";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import { ThumbsUp, Trash2 } from "lucide-react";
import styles from "./styles.module.css";
import type { ComponentConfigArray } from "@/shared/types";

type Props = {
    formComponentsState: ComponentConfigArray;
    onRemoveField: (positionNumber: number) => void;
    onPickFieldActive: (positionNumber: number) => void;
};

const FormConstructor: FC<Props> = (props) => {
    const { formComponentsState, onPickFieldActive, onRemoveField } = props;

    const [form] = Form.useForm();


    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            wrapperCol={{ span: 8 }}
        >
            {formComponentsState.map((config) => (
                <FieldWithButton
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
                                onClick={() =>
                                    onPickFieldActive(config.position)
                                }
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
