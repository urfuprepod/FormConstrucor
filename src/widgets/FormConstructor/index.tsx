import { Button, Form } from "antd";
import { useMemo, type FC } from "react";
import { downloadJson } from "@/shared/methods";
import { FlexInLine } from "@/shared/components";
import styles from "./styles.module.css";
import type { ComponentConfigWithStateArray } from "@/shared/types/constructor";
import {
    FormGrid,
    FormRow,
    ModeConstructorBlock,
} from "@/entities/FormConstructor/components";
import { FormStateContext } from "@/entities/FormConstructor/context/formStateContext";
import { useFormData } from "@/entities/FormConstructor/hooks";
import { useFormConstructor } from "@/app/store/useFormConstructor";

type Props = {
    isDisabled?: boolean;
    isEditMode: boolean;
    toggleEditMode: (val: boolean) => void;
};

const FormConstructor: FC<Props> = (props) => {
    const { isDisabled, isEditMode, toggleEditMode } = props;

    const { form, updateFormState } = useFormData();

    const {
        fields: formComponentsState,
        grids,
        formState,
        activeGridId,
    } = useFormConstructor();

    const activeGrid = grids.find((el) =>
        activeGridId ? el.id === activeGridId : el.colId === null
    );

    return (
        <>
            <ModeConstructorBlock
                isEditMode={isEditMode}
                toggleEditMode={toggleEditMode}
            />


            <FormStateContext.Provider value={{ updateFormState, form }}>
                <Form
                    className={styles.form}
                    style={{ gap: formState.space + "px" }}
                    layout="vertical"
                    form={form}
                    onClick={(e) => e.stopPropagation()}
                    disabled={!!isDisabled}
                    wrapperCol={{ span: 8 }}
                >
                    {activeGrid && <FormGrid grid={activeGrid} />}

                    <FlexInLine gap={8}>
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
