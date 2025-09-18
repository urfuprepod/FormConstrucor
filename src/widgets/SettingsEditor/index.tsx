import { useFormConstructor } from "@/app/store/useFormConstructor";
import { commonProps } from "@/entities/FormConstructor/constants";
import { useFormConstructorContext } from "@/entities/FormConstructor/context/formConstructor";
import { useCalculatetriggerSettings } from "@/entities/FormConstructor/hooks";
import { HideConstructor } from "@/entities/SettingsEditor/components";
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
import { useState } from "react";
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
        setLocalData(activeItem.data);
    }, [activeItem.position]);

    const [localData, setLocalData] = useState<Arch<SettingsFieldsStatic>>(
        activeItem.data
    );

    const { fields, updateConfig } = useFormConstructorContext();

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

            <HideConstructor
                activeItem={activeItem}
                updateConfig={updateConfig}
                fields={fields}
            />
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

    const { formState } = useFormConstructor();

    const opts =
        field?.optionsGenerator?.(formState) ?? field.options ?? undefined;

    if (guardFn(field))
        return (
            <>
                <Component
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...opts}
                />
            </>
        );

    return null;
};

export default SettingsEditor;
