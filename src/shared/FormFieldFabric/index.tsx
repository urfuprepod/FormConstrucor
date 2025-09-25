import { Form } from "antd";
import type {
    ComponentConfig,
    Arch,
    SettingsFieldsStatic,
} from "../types/constructor";
import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type Props<T extends SettingsFieldsStatic> = {
    Component: ComponentConfig<T>["Component"];
    fieldValues: Arch<T>;
};

const FormFieldFabric = <T extends SettingsFieldsStatic>(props: Props<T>) => {
    const { Component, fieldValues } = props;

    return (
        <Form.Item
            name={fieldValues.name}
            label={fieldValues.label}
            labelCol={{
                span: 24,
                style: {
                    fontWeight: 500,
                },
            }}
            rules={[
                {
                    required: !!fieldValues.required,
                    message: "Поле обязательно",
                },
            ]}
            className={clsx(styles["form-item"])}
            wrapperCol={{ span: 24, style: { width: "100%" } }}
        >
            {React.createElement(Component, fieldValues)}
        </Form.Item>
    );
};

export default FormFieldFabric;
