import { commonProps } from "@/entities/FormConstructor/constants";
import { getSettingsValues } from "@/shared/methods";
import type {
    Arch,
    ComponentConfigWithStateArray,
    SettingsField,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { Checkbox, Form, Input, Select } from "antd";
import { useForm, type FormInstance } from "antd/es/form/Form";
import { useEffect, useMemo, type FC } from "react";

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
            initialValues={{ ...getSettingsValues(joined), ...activeItem.data }}
        >
            {joined.map((field) => (
                <Form.Item
                    name={field.propertyName}
                    label={field.labelText}
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
                        {...field}
                        form={form}
                        onChange={(value: any) =>
                            form.setFieldsValue({ [field.propertyName]: value })
                        }
                    />
                </Form.Item>
            ))}
        </Form>
    );
};

const Field: FC<
    SettingsField & { form: FormInstance; onChange: (val: any) => void }
> = (props) => {
    const { type, propertyName, placeholder, form, onChange } = props;

    const value = form.getFieldValue(propertyName);

    switch (type) {
        case "input":
            return (
                <Input
                    id={propertyName}
                    value={value}
                    name={propertyName}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        case "select":
            return (
                <Select<string>
                    placeholder={placeholder}
                    value={value}
                    id={propertyName}
                    onChange={onChange}
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    id={propertyName}
                    checked={value}
                    name={propertyName}
                    onChange={(e) => onChange(e.target.checked)}
                />
            );
        case "number":
            return (
                <Input
                    type="number"
                    value={String(value)}
                    name={propertyName}
                    id={propertyName}
                    placeholder={placeholder}
                    onChange={(e) => onChange(+e.target.value)}
                />
            );
        default:
            const _exhaustiveCheck: never = type;
            return _exhaustiveCheck;
    }
};

export default SettingsEditor;
