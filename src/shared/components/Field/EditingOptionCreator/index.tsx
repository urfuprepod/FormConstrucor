import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { DeleteButton, FlexInLine } from "@/shared/components";
import ComponentWithButtons from "@/shared/components/ComponentWithButtons";
import { useInput } from "@/shared/hooks";
import type { IOption } from "@/shared/types/selelct";
import { Button, Flex, Input, Typography } from "antd";
import { X } from "lucide-react";
import { useMemo, type FC } from "react";

type Props = EditingFieldProps<"options">;

const SelectOptionCreator: FC<Props> = (props) => {
    const { value, onChange, maxLength } = props;

    const [labelData, updateLabelData, setLabelData] = useInput("");
    const [valueData, updateValueData, setValueData] = useInput("");

    const isValidToCreate = useMemo<boolean>(() => {
        const isMaxLengthValid =
            !maxLength || !value || value.length < maxLength;
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

    const onRemoveOption = (val: string) => {
        onChange((value ?? []).filter((el) => el.value !== val));
    };

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={6} justify="flex-end">
                <FlexInLine gap={10}>
                    <Input
                        placeholder={"Имя поля"}
                        value={labelData}
                        onChange={updateLabelData}
                    />
                    <Input
                        placeholder={"Значение поля"}
                        value={valueData}
                        onChange={updateValueData}
                    />
                </FlexInLine>

                <Flex justify="space-between" gap={6} align="center">
                    {!!maxLength &&
                        !!value &&
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

            {value?.map((option: IOption) => (
                <ComponentWithButtons
                    key={option.value}
                    buttonsBlock={
                        <DeleteButton
                            onClick={() => onRemoveOption(option.value)}
                            icon={
                                <X size={16} color="#ffffff" strokeWidth={1} />
                            }
                        />
                    }
                >
                    <Typography.Text strong>
                        {option.label} {`(${option.value})`}
                    </Typography.Text>
                </ComponentWithButtons>
            ))}
        </Flex>
    );
};

export default SelectOptionCreator;
