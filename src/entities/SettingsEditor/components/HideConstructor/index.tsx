import { FlexInLine, HiddenContainer } from "@/shared/components";
import { fieldVariantsOptions } from "@/shared/constants";
import type {
    ComponentConfig,
    ComponentConfigWithStateArray,
    FieldVariant,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import type { IOption } from "@/shared/types/selelct";
import { Flex, Input, Select, Typography } from "antd";
import { useEffect, useMemo, useState, type FC } from "react";

type Props = {
    activeItem: ComponentConfigWithStateArray[number];
    fields: ComponentConfigWithStateArray;
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => void;
};

const HideConstructor: FC<Props> = (props) => {
    const { activeItem, fields, updateConfig } = props;

    const [fieldItem, setFieldItem] = useState<
        ComponentConfigWithStateArray[number] | null
    >(null);
    const [fieldVariant, setFieldVariant] = useState<FieldVariant | null>(null);
    const [equalValue, setEqualValue] = useState<string | null>(null);

    const parsedOptionsFromFields = useMemo<IOption[]>(() => {
        return fields.filterMap(
            (item) => item.position !== activeItem.position && !!item.data.name,
            (el) => ({ label: el.data.label, value: el.data.name })
        );
    }, [activeItem, fields]);

    useEffect(() => {
        if (fieldItem && fieldVariant) {
            updateConfig(activeItem.position, "hide", {
                type: fieldVariant,
                field: fieldItem.data.name,
                value: equalValue,
            });
        }
    }, [fieldItem, fieldVariant, equalValue]);

    const onUpdateField = (val: string | null) => {
        const actual = fields.find((el) => el.data.name === val);
        setFieldItem(actual ?? null);
        setFieldVariant(null);
        setEqualValue(null);
    };

    return (
        <Flex vertical gap={12}>
            <Typography.Title level={5}>Скрыть, если</Typography.Title>

            <FlexInLine gap={8}>
                <Select<string>
                    options={parsedOptionsFromFields}
                    placeholder="Выберите поле"
                    allowClear
                    onClear={() => onUpdateField(null)}
                    value={fieldItem?.data.name}
                    onChange={onUpdateField}
                />
                <Select<FieldVariant>
                    options={fieldVariantsOptions}
                    placeholder="Условие"
                    value={fieldVariant}
                    onChange={setFieldVariant}
                />

                <HiddenContainer isInvisible={fieldVariant !== "equal"}>
                    <Input
                        value={equalValue ?? ""}
                        onChange={(e) => setEqualValue(e.target.value)}
                        placeholder="Равно"
                    />
                </HiddenContainer>
            </FlexInLine>
        </Flex>
    );
};

export default HideConstructor;
