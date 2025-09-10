import { commonProps } from "@/entities/FormConstructor/constants";
import { getSettingsValues } from "@/shared/methods";
import type {
    Arch,
    ComponentConfigWithStateArray,
    FieldType,
    GetFieldValueType,
    SettingsField,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { Checkbox, Form, Input, Select } from "antd";
import { useForm, type FormInstance } from "antd/es/form/Form";
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

    // useEffect(() => {
    //     console.log('чи да');
    //     form.setFieldsValue(activeItem.data);
    // }, [activeItem])

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
                    getValueProps={(value) =>
                        field.type === "checkbox"
                            ? { checked: value }
                            : { value }
                    }
                    valuePropName={
                        field.type === "checkbox" ? "checked" : "value"
                    }
                >
                    <Field
                        settingsField={field}
                        value={activeItem.data[field.propertyName]}
                        onChange={(val) =>
                            updateField(activeItem.position, val)
                        }
                    />
                </Form.Item>
            ))}
        </Form>
    );
};

type FormFieldProps<K extends FieldType> = {
    settingsField: SettingsField<K>;
    value: GetFieldValueType<K>;
    onChange: (val: GetFieldValueType<K>) => void;
};

type ChangeHandler<T extends FieldType> = {
    [P in T]: (e: any) => void;
};

const Field = <T extends FieldType>(props: FormFieldProps<T>) => {
    const {
        settingsField: { propertyName, type, placeholder },
        value,
        onChange,
    } = props;

    // Создаем обработчик событий с учетом типа поля
    const handleChange: ChangeHandler<FieldType> = {
        input: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value as GetFieldValueType<T>);
        },
        select: (val: string) => {
            onChange(val as GetFieldValueType<T>);
        },
        checkbox: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.checked as GetFieldValueType<T>);
        },
        number: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(+e.target.value as GetFieldValueType<T>);
        },
    };

    switch (type) {
        case "input":
            return (
                <Input
                    id={propertyName}
                    value={value as string}
                    name={propertyName}
                    placeholder={placeholder}
                    onChange={handleChange.input}
                />
            );
        case "select":
            return (
                <Select<string>
                    placeholder={placeholder}
                    value={value as string}
                    id={propertyName}
                    onChange={handleChange.select}
                />
            );
        case "checkbox":
            return (
                <Checkbox
                    id={propertyName}
                    checked={value as boolean}
                    name={propertyName}
                    onChange={handleChange.checkbox}
                />
            );
        case "number":
            return (
                <Input
                    type="number"
                    value={value as number}
                    name={propertyName}
                    id={propertyName}
                    placeholder={placeholder}
                    onChange={handleChange.number}
                />
            );
        default:
            const _exhaustiveCheck: never = type;
            return _exhaustiveCheck;
    }
};

export default SettingsEditor;
