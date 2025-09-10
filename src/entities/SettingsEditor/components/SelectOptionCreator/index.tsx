import { FlexInLine } from "@/shared/components";
import { useInput } from "@/shared/hooks";
import type { SettingsField } from "@/shared/types/constructor";
import type { IOption } from "@/shared/types/selelct";
import { Button, Flex, Input, Typography } from "antd";
import React, { useMemo, type FC } from "react";

type Props = SettingsField & {
    value: IOption[];
    onChange: (val: IOption[]) => void;
};

const SelectOptionCreator: FC<Props> = (props) => {
    const { value, onChange, placeholder, propertyName } = props;

    const [labelData, updateLabelData] = useInput("");
    const [valueData, updateValueData] = useInput("");

    const isValidToCreate = useMemo<boolean>(() => {
        return !!(
            labelData &&
            valueData &&
            !value.find((el) => el.value === valueData)
        );
    }, [labelData, valueData, value]);

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={6} justify="flex-end">
                <FlexInLine gap={10}>
                    <Input
                        placeholder={placeholder}
                        value={labelData}
                        onChange={updateLabelData}
                    />
                    <Input
                        placeholder={placeholder}
                        value={valueData}
                        onChange={updateValueData}
                    />
                </FlexInLine>

                <Button
                    disabled={!isValidToCreate}
                    color="cyan"
                    variant="solid"
                    onClick={() => {
                        onChange(
                            value.concat({ label: labelData, value: valueData })
                        );
                    }}
                >
                    Добавить
                </Button>
            </Flex>

            {value.map((el) => (
                <Typography.Paragraph strong>
                    {el.label} {`(${el.value})`}
                </Typography.Paragraph>
            ))}
        </Flex>
    );
};

export default SelectOptionCreator;
