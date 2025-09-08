import { Form } from "antd";
import type {
    SettingsField,
    ComponentConfig,
    Ahue,
} from "../types";
import { commonPropsToObjectForm } from "@/entities/FormConstructor/constants";
import React from "react";

type Props<T extends readonly SettingsField[]> = {
    Component: ComponentConfig<T>["Component"];
    fieldValues: Ahue<T>;
};

const FormFieldFabric = <T extends readonly SettingsField[]>(props: Props<T>) => {
    const { Component, fieldValues } = props;

    return (
        <Form.Item
            name={commonPropsToObjectForm.name}
            label={commonPropsToObjectForm.label}
            labelCol={{
                span: 24,
                style: {
                    fontWeight: 500,
                },
            }}
            rules={[
                {
                    required: !!commonPropsToObjectForm.required,
                    message: "Поле обязательно",
                },
            ]}
            style={{ marginBottom: 0, flex: "1 1 auto" }}
            wrapperCol={{ span: 24, style: { width: "100%" } }}
        >
            {React.createElement(Component, fieldValues)}
        </Form.Item>
    );
};

export default FormFieldFabric;
