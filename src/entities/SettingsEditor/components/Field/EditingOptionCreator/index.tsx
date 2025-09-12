import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { FlexInLine } from "@/shared/components";
import { useInput } from "@/shared/hooks";
import type { IOption } from "@/shared/types/selelct";
import { Button, Flex, Input, Typography } from "antd";
import { useMemo, type FC } from "react";

type Props = EditingFieldProps<"options">;

const SelectOptionCreator: FC<Props> = (props) => {
    const { value, onChange, placeholder, propertyName, maxLength } = props;

    const [labelData, updateLabelData, setLabelData] = useInput("");
    const [valueData, updateValueData, setValueData] = useInput("");

    const isValidToCreate = useMemo<boolean>(() => {
        const isMaxLengthValid = !maxLength || value?.length < maxLength;
        const isUnique = !value?.find((el: IOption) => el.value === valueData);

        return !!(labelData && isMaxLengthValid && valueData && isUnique);
    }, [labelData, valueData, value, maxLength]);

    const onAddOption = () => {
        onChange(
            (value ?? []).concat({
                label: labelData,
                value: valueData,
            })
        );

        setValueData("");
        setLabelData("");
    };

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={6} justify="flex-end">
                <FlexInLine gap={10}>
                    <Input
                        placeholder={'Имя поля'}
                        value={labelData}
                        onChange={updateLabelData}
                    />
                    <Input
                        placeholder={'Значение поля'}
                        value={valueData}
                        onChange={updateValueData}
                    />
                </FlexInLine>

                <Flex justify="space-between" gap={6} align="center">
                    {maxLength &&
                        value.length >= maxLength &&
                        "Достигнут лимит"}
                    <Button
                        disabled={!isValidToCreate}
                        color="cyan"
                        variant="solid"
                        onClick={onAddOption}
                    >
                        Добавить
                    </Button>
                </Flex>
            </Flex>

            {value?.map((el: IOption) => (
                <Typography.Paragraph strong key={el.value}>
                    {el.label} {`(${el.value})`}
                </Typography.Paragraph>
            ))}
        </Flex>
    );
};

export default SelectOptionCreator;
