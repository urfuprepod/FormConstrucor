import { commonProps } from "@/entities/FormConstructor/constants";
import { useCalculatetriggerSettings } from "@/entities/FormConstructor/hooks";
import { editingFieldsDictionary } from "@/entities/SettingsEditor/constants";
import { getSettingsValues } from "@/shared/methods";
import {
    type Arch,
    type ComponentConfigWithStateArray,
    type FieldProps,
    type SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { Form } from "antd";
import { useForm, type FormInstance } from "antd/es/form/Form";
import React, { useState } from "react";
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
   
        // setLocalData(allValues);
    };

    const joined = [...commonProps, ...activeItem.settings];

    useEffect(() => {
        form.setFieldsValue({
            ...getSettingsValues(joined),
            ...activeItem.data,
        });
        setLocalData(activeItem.data);
    }, [activeItem.position]);

    const [localData, setLocalData] = useState<Arch<SettingsFieldsStatic>>(
        activeItem.data
    );

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
                        span: field.type === "checkbox" ? 20 : 24,
                        style: {
                            fontWeight: 500,
                            textAlign: "left",
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
                        onChange={
                            (value: any) =>
                                form.setFieldsValue({
                                    [field.propertyName]: value,
                                })
                            // setLocalData({
                            //     ...localData,
                            //     [field.propertyName]: value,
                            // })
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

    useCalculatetriggerSettings(
        value,
        form.getFieldsValue(),
        onChange,
        field.dependsOn
    );

    if (guardFn(field))
        return (
            <>
                {React.createElement(Component, {
                    ...field.options,
                    placeholder,
                    propertyName,
                    value,
                    onChange,
                })}
            </>
        );

    return null;
};

export default SettingsEditor;
