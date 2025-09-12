import { commonProps } from "@/entities/FormConstructor/constants";
import { editingFieldsDictionary } from "@/entities/SettingsEditor/constants";
import { getSettingsValues } from "@/shared/methods";
import {
    isInputField,
    isNumberField,
    isSelectField,
    type Arch,
    type ComponentConfigWithStateArray,
    type FieldProps,
    type FieldType,
    type SettingsField,
    type SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useForm, type FormInstance } from "antd/es/form/Form";
import React from "react";
import { useEffect, type FC } from "react";

type Props = {
    activeItem: ComponentConfigWithStateArray[number];
    updateField: <T extends SettingsFieldsStatic>(
        positionNumber: number,
        data: Arch<T>
    ) => void;
};

const SettingsEditor: FC<Props> = (props) => {
    const [form] = useForm();

    const { activeItem, updateField } = props;

    const onValuesChange = (_: any, allValues: Arch<SettingsFieldsStatic>) => {
        updateField(activeItem.position, allValues);
    };

    const joined = [...commonProps, ...activeItem.settings];

    useEffect(() => {
        form.setFieldsValue({
            ...getSettingsValues(joined),
            ...activeItem.data,
        });
    }, [activeItem.position]);

    return (
        <Form<Arch<SettingsFieldsStatic>>
            onValuesChange={onValuesChange}
            form={form}
            initialValues={{
                ...getSettingsValues(joined),
                ...activeItem.data,
            }}
        >
            {joined.map((field) => (
                <Form.Item
                    name={field.propertyName}
                    label={field.labelText}
                    labelCol={{
                        // span: 24,
                        style: {
                            fontWeight: 500,
                        },
                    }}
                    // wrapperCol={{ span: 24, style: { width: "100%" } }}
                    key={field.propertyName}
                    getValueProps={(value) => {
                        if (field.type === "checkbox")
                            return { checked: value };
                        return { value };
                    }}
                    valuePropName={
                        field.type === "checkbox" ? "checked" : "value"
                    }
                >
                    <Field
                        field={field}
                        form={form}
                        onChange={(value: any) =>
                            form.setFieldsValue({
                                [field.propertyName]: value,
                            })
                        }
                    />
                </Form.Item>
            ))}
        </Form>
    );
};

const Field: FC<{
    field: FieldProps;
    form: FormInstance;
    onChange: (val: any) => void;
}> = (props) => {
    const { field, form, onChange } = props;

    const { propertyName, placeholder } = field;

    const value = form.getFieldValue(propertyName);

    const [guardFn, Component] = editingFieldsDictionary[field.type];
    if (guardFn(field))
        return React.createElement(Component, {
            ...field.options,
            placeholder,
            propertyName,
            value,
            onChange,
        });

    return null;
};

export default SettingsEditor;
