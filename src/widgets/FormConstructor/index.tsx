import { Button, Form, Row } from "antd";
import { useEffect, useState, type FC } from "react";
import { downloadJson } from "@/shared/methods";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import { ThumbsUp, Trash2 } from "lucide-react";
import styles from "./styles.module.css";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { MainFormSettings } from "@/entities/FormConstructor/components";
import { useFormConstructor } from "@/app/store/useFormConstructor";

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
    const [isActiveSettings, setIsActiveSettings] = useState<boolean>(false);
    const { formState } = useFormConstructor();

    return (
        <>
            <Button
                color="primary"
                variant={isActiveSettings ?  "outlined" : 'solid'}
                onClick={() => setIsActiveSettings((prev) => !prev)}
            >
                Настройки формы
            </Button>
            <MainFormSettings isActive={isActiveSettings} />
            <Form
                className={styles.form}
                layout="vertical"
                form={form}
                onClick={(e) => e.stopPropagation()}
                disabled={!!isDisabled}
                wrapperCol={{ span: 8 }}
            >
                <Row gutter={[formState.gap, formState.gap]}>
                    {formComponentsState.map((config) => (
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
                                        onClick={() =>
                                            onRemoveField(config.position)
                                        }
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

                <Button
                    onClick={() =>
                        downloadJson({ fields: formComponentsState })
                    }
                    type="primary"
                    htmlType="submit"
                >
                    Скачать форму
                </Button>
            </Form>
        </>
    );
};

export default FormConstructor;
