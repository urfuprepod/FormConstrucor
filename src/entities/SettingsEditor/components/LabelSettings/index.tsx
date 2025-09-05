import type { FieldWithPosition } from "@/entities/FormConstructor/types";
import type { IFieldOptions } from "@/entities/FormFieldFabric/types";
import { ColorPickerSetting } from "@/shared/components";
import { Flex, Form, Input } from "antd";
import { type FC } from "react";
// import "react-color-palette/css";

type Props = {
    activeItem: FieldWithPosition;
    onUpdateField: (
        key: keyof IFieldOptions,
        val: IFieldOptions[keyof IFieldOptions]
    ) => void;
};

const LabelSettings: FC<Props> = (props) => {
    const { activeItem, onUpdateField } = props;

    const options = activeItem.options.label;

    function onUpdateLabel<K extends keyof IFieldOptions["label"]>(
        key: K,
        val: IFieldOptions["label"][K]
    ) {
        onUpdateField("label", { ...options, [key]: val });
    }

    return (
        <Flex vertical gap={5}>
            <Form.Item label="Значение лейбла">
                <Input
                    placeholder="Введите лейбл..."
                    value={options.value}
                    onChange={(e) => onUpdateLabel("value", e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Укажите размер шрифта">
                <Input
                    type="number"
                    value={options.fontSize}
                    onChange={(e) => onUpdateLabel("fontSize", +e.target.value)}
                />
            </Form.Item>

            {/* <Form.Item label="Настройка цвета">
                <ColorPickerSetting
                    value={options.color}
                    updateValue={(val) => onUpdateLabel("color", val)}
                />
            </Form.Item> */}
        </Flex>
    );
};

export default LabelSettings;

