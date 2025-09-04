import React, { type FC } from "react";
import { type Field } from "@/entities/FormFieldFabric/types";
import { Form } from "antd";
import Input from "./Input";
import Select from "./Select";

type Props = Field;

const FormFieldFabric: FC<Props> = (props) => {
    const { label, name } = props.options;

    return (
        <Form.Item
            name={name}
            label={label?.value}
            labelCol={{
                span: 6,
                style: { fontSize: label?.fontSize, color: label?.color },
            }}
        >
            <Field {...props} />
        </Form.Item>
    );
};

const Field: FC<Props> = (props) => {
    switch (props.variant) {
        case "input":
            return <Input {...props.options} />;
        case "select":
            return <Select {...props.options} />

        default:
            // TypeScript обеспечит exhaustiveness checking
            const _exhaustiveCheck: never = props;
            return _exhaustiveCheck;
    }
};

export default FormFieldFabric;
