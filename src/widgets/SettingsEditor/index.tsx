import { useFormConstructor } from "@/app/store/useFormConstructor";
import { commonProps } from "@/entities/FormConstructor/constants";
import { useCalculatetriggerSettings } from "@/entities/FormConstructor/hooks";
import { HideConstructor } from "@/entities/SettingsEditor/components";
import { SettingField } from "@/shared/components";
import { getSettingsValues } from "@/shared/methods";
import {
    type Arch,
    type ComponentConfigWithStateArray,
    type FieldProps,
    type GetFieldValueType,
    type SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { Form } from "antd";
import { useForm, type FormInstance } from "antd/es/form/Form";
import { useEffect, useState, type FC } from "react";

type Props = {
    activeItem: ComponentConfigWithStateArray[number];
};

const SettingsEditor: FC<Props> = (props) => {
    const [form] = useForm();

    const { activeItem } = props;

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

    const { fields, updateConfig, updateField } = useFormConstructor();

    return (
        <Form<Arch<SettingsFieldsStatic>>
            data-testid="editor"
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
                        value={form.getFieldValue(field.propertyName)}
                        onChange={(value: any) =>
                            form.setFieldsValue({
                                [field.propertyName]: value,
                            })
                        }
                        form={form}
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

export default SettingsEditor;

const Field: FC<{
    field: FieldProps;
    value: GetFieldValueType<FieldProps["type"]>;
    onChange: (val: any) => void;
    form: FormInstance;
}> = (props) => {
    const { field, value, onChange, form } = props;

    useCalculatetriggerSettings(
        value,
        form.getFieldsValue(),
        onChange,
        field.dependsOn
    );

    return <SettingField field={field} value={value} onChange={onChange} />;
};
