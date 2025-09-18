import { Button, Form, Popover, Row } from "antd";
import { useMemo, useState, type FC } from "react";
import { downloadJson } from "@/shared/methods";
import {
    AddButton,
    DeleteButton,
    FieldWithButton,
    FlexInLine,
} from "@/shared/components";
import { ThumbsUp, Trash2 } from "lucide-react";
import styles from "./styles.module.css";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import { MainFormSettings } from "@/entities/FormConstructor/components";
import { useFormConstructor } from "@/app/store/useFormConstructor";

type Props = {
    formComponentsState: ComponentConfigWithStateArray;
    onRemoveField: (positionNumber: number) => void;
    onPickFieldActive: (positionNumber: number) => void;
    isDisabled?: boolean;
    activePositionNumber: number | null;
};

const FormConstructor: FC<Props> = (props) => {
    const {
        formComponentsState,
        isDisabled,
        onPickFieldActive,
        onRemoveField,
        activePositionNumber,
    } = props;

    const [form] = Form.useForm();
    const [isActiveSettings, setIsActiveSettings] = useState<boolean>(false);
    const { formState, increaseRowNumber, rowNumber } = useFormConstructor();

    const groupedFormComponentsByRowLevel = useMemo<
        Map<number, ComponentConfigWithStateArray>
    >(() => {
        return formComponentsState.reduce(
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
    }, [formComponentsState]);

    const isBlockedAddingRow = useMemo<boolean>(() => {
        const items = groupedFormComponentsByRowLevel.get(rowNumber);
        return !items?.length;
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
            <Form
                className={styles.form}
                layout="vertical"
                form={form}
                onClick={(e) => e.stopPropagation()}
                disabled={!!isDisabled}
                wrapperCol={{ span: 8 }}
            >
                {Array.from(groupedFormComponentsByRowLevel.entries()).map(
                    ([rowIndex, rowComponents]) => (
                        <Row
                            key={rowIndex}
                            gutter={[formState.gap, formState.gap]}
                        >
                            {rowComponents.map((config) => (
                                <FieldWithButton
                                    style={{
                                        border:
                                            config.position ===
                                            activePositionNumber
                                                ? "1px solid red"
                                                : "",
                                    }}
                                    componentConfiguration={config}
                                    form={form}
                                    key={config.position}
                                    buttonsBlock={
                                        <>
                                            <DeleteButton
                                                onClick={() =>
                                                    onRemoveField(
                                                        config.position
                                                    )
                                                }
                                                icon={
                                                    <Trash2
                                                        size={16}
                                                        color="#ffffff"
                                                        strokeWidth={1}
                                                    />
                                                }
                                            />
                                            <AddButton
                                                onClick={() => {
                                                    onPickFieldActive(
                                                        config.position
                                                    );
                                                }}
                                                icon={
                                                    <ThumbsUp
                                                        size={16}
                                                        color="#ffffff"
                                                        strokeWidth={1}
                                                    />
                                                }
                                            />
                                        </>
                                    }
                                />
                            ))}
                        </Row>
                    )
                )}

                <FlexInLine gap={8}>
                    <Popover
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
                    </Popover>

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
        </>
    );
};

export default FormConstructor;
