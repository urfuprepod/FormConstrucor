import type { FieldWithPosition } from "@/entities/FormConstructor/types";
import type { Field, IFieldOptions } from "@/entities/FormFieldFabric/types";
import { Checkbox, Flex, Form, Input } from "antd";
import { type FC } from "react";
import LabelSettings from "../LabelSettings";

type Props = {
    activeItem: FieldWithPosition;
    updateField: (positionNumber: number, updatedField: Field) => void;
};

const DefaultSettings: FC<Props> = (props) => {
    const { activeItem, updateField } = props;

    const options = activeItem.options;

    const onUpdateField = (
        key: keyof IFieldOptions,
        val: IFieldOptions[keyof IFieldOptions]
    ) => {
        updateField(activeItem.position, {
            ...activeItem,
            options: { ...options, [key]: val },
        } as Field);
    };

    return (
        <Flex vertical gap={10}>
            <Form.Item label="Имя поля">
                <Input
                    placeholder="Введите имя..."
                    value={options.name}
                    onChange={(e) => onUpdateField("name", e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Заблокировано">
                <Checkbox
                    defaultChecked={!!options.isDisabled}
                    value={!!options.isDisabled}
                    onChange={() =>
                        onUpdateField("isDisabled", !options.isDisabled)
                    }
                />
            </Form.Item>

            <Form.Item label="Значение placeholder">
                <Input
                    placeholder="Введите placeholder..."
                    value={options.placeholder}
                    onChange={(e) =>
                        onUpdateField("placeholder", e.target.value)
                    }
                />
            </Form.Item>

            <Form.Item label="Поле обязательно к заполнению">
                <Checkbox
                    defaultChecked={!!options.required}
                    value={!!options.required}
                    onChange={() =>
                        onUpdateField("required", !options.required)
                    }
                />
            </Form.Item>

            <LabelSettings activeItem={activeItem} onUpdateField={onUpdateField} />
        </Flex>
    );
};

export default DefaultSettings;
