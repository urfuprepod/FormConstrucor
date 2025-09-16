import { FlexInLine } from "@/shared/components";
import type { ComponentConfigWithStateArray, SettingsField } from "@/shared/types/constructor";
import type { IOption } from "@/shared/types/selelct";
import { Flex, Select, Typography } from "antd";
import React, { useMemo, useState, type FC } from "react";

type Props = {
    activeItem: ComponentConfigWithStateArray[number];
    fields: ComponentConfigWithStateArray;
};

const fieldVariantsOptions = [
    { label: "Поле пустое/0/false", value: "empty" },
    { label: "Поле имеет значение", value: "full" },
    {label: 'Поле равняется', value: 'equal'}
] as const satisfies IOption[];

type FieldVariant = (typeof fieldVariantsOptions)[number]["value"];

const HideConstructor: FC<Props> = (props) => {
    const { activeItem, fields } = props;


    const [fieldItem, setFieldItem] = useState<SettingsField | null>(null);
    const [fieldVariant, setFieldVariant] = useState<FieldVariant | null>(null)

    const parseedOptionsFromFields = useMemo(() => {
        
    }, [activeItem, fields])

    return (
        <Flex vertical gap={8}>
            <Typography.Title level={5}>Скрыть, если</Typography.Title>

            <FlexInLine gap={5}>
                {/* <Select options={} /> */}
            </FlexInLine>
        </Flex>
    );
};

export default HideConstructor;
