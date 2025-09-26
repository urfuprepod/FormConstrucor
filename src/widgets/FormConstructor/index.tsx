import { Button, Form } from "antd";
import { useMemo, useState, type FC } from "react";
import { downloadJson } from "@/shared/methods";
import { FlexInLine, RowCreationBlock } from "@/shared/components";
import styles from "./styles.module.css";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import {
    FormRow,
    MainFormSettings,
} from "@/entities/FormConstructor/components";
import { FormStateContext } from "@/entities/FormConstructor/context/formStateContext";
import { useFormData } from "@/entities/FormConstructor/hooks";
import { useFormConstructor } from "@/app/store/useFormConstructor";

type Props = {
    onPickFieldActive: (positionNumber: number) => void;
    isDisabled?: boolean;
    activePositionNumber: number | null;
    activeDraggableId: string | null,
};

const FormConstructor: FC<Props> = (props) => {
    const { isDisabled, onPickFieldActive, activePositionNumber, activeDraggableId } = props;

    const { form, updateFormState } = useFormData();
    const [isActiveSettings, setIsActiveSettings] = useState<boolean>(false);
    const { fields: formComponentsState, rowNumber } = useFormConstructor();

    const groupedFormComponentsByRowLevel = useMemo<{
        mapObject: Map<number, ComponentConfigWithStateArray>;
        arrayForm: [number, ComponentConfigWithStateArray][];
    }>(() => {
        const mappedGroups: Map<number, ComponentConfigWithStateArray> =
            formComponentsState.reduce(
                (
                    acc: Map<number, ComponentConfigWithStateArray>,
                    cur: ComponentConfigWithStateArray[number]
                ) => {
                    const items = acc.get(cur.rowNumber);
                    if (!items) {
                        acc.set(cur.rowNumber, [cur]);
                        return acc;
                    }

                    acc.set(cur.rowNumber, items.concat(cur));
                    return acc;
                },
                new Map()
            );

        return {
            mapObject: mappedGroups,
            arrayForm: Array.from(mappedGroups.entries()).sort(
                ([keyA], [keyB]) => keyA - keyB
            ),
        };
    }, [formComponentsState]);

    const isBlockedAddingRow = useMemo<boolean>(() => {
        const items = groupedFormComponentsByRowLevel.mapObject.get(rowNumber);
        return items?.length === 1;
    }, [groupedFormComponentsByRowLevel, rowNumber]);
    return (
        <>
            <Button
                color="primary"
                variant={isActiveSettings ? "outlined" : "solid"}
                onClick={() => setIsActiveSettings((prev) => !prev)}
            >
                Настройки формы
            </Button>
            <MainFormSettings isActive={isActiveSettings} />
            <FormStateContext.Provider value={{ updateFormState }}>
                <Form
                    className={styles.form}
                    layout="vertical"
                    form={form}
                    onClick={(e) => e.stopPropagation()}
                    disabled={!!isDisabled}
                    wrapperCol={{ span: 8 }}
                >
                    {groupedFormComponentsByRowLevel.arrayForm.map(
                        ([rowIndex, rowComponents]) => (
                            <FormRow
                                rowComponents={rowComponents}
                                form={form}
                                onPickFieldActive={onPickFieldActive}
                                activePositionNumber={activePositionNumber}
                                key={rowIndex}
                                activeDraggableId={activeDraggableId}
                                rowIndex={rowIndex}
                            />
                        )
                    )}

                    <RowCreationBlock isLastRowEmpty={isBlockedAddingRow} />

                    <FlexInLine gap={8}>
                        {/* <Popover
                            content={
                                isBlockedAddingRow
                                    ? "Последняя строка и так пустая"
                                    : undefined
                            }
                        >
                            <Button
                                disabled={isBlockedAddingRow}
                                onClick={increaseRowNumber}
                                type="primary"
                            >
                                Добавить строку
                            </Button>
                        </Popover> */}

                        <Button
                            onClick={() =>
                                downloadJson({ fields: formComponentsState })
                            }
                            variant="solid"
                            color="green"
                        >
                            Скачать форму
                        </Button>
                    </FlexInLine>
                </Form>
            </FormStateContext.Provider>
        </>
    );
};

export default FormConstructor;
