import { Button, Form } from "antd";
import { type FC } from "react";
import { type IFormConstructor } from "@/entities/FormConstructor/types";
import { downloadJson } from "@/shared/methods";
import { AddButton, DeleteButton, FieldWithButton } from "@/shared/components";
import { ThumbsUp, Trash2 } from "lucide-react";
import styles from "./styles.module.css";

type Props = {
    formGenerator: IFormConstructor;
    onRemoveField: (positionNumber: number) => void;
    onPickFieldActive: (positionNumber: number) => void;
};

const FormConstructor: FC<Props> = (props) => {
    const { formGenerator, onPickFieldActive, onRemoveField } = props;

    const [form] = Form.useForm();

    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            wrapperCol={{ span: 8 }}
        >
            {formGenerator.fields.map((field) => (
                <FieldWithButton
                    field={field}
                    key={field.position}
                    buttonsBlock={
                        <>
                            {" "}
                            <DeleteButton
                                onClick={() => onRemoveField(field.position)}
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
                                    onPickFieldActive(field.position)
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
                onClick={() => downloadJson(formGenerator)}
                type="primary"
                htmlType="submit"
            >
                Скачать форму
            </Button>
        </Form>
    );
};

export default FormConstructor;
