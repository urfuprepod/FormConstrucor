import FormFieldFabric from "@/shared/FormFieldFabric";
import type {
    SettingsFieldsStatic,
    ComponentConfigWithState,
} from "@/shared/types/constructor";
import React, { useEffect, useMemo } from "react";
import ComponentWithButtons from "../ComponentWithButtons";
import styles from "./style.module.css";
import { Col, Form, type FormInstance } from "antd";
import HiddenContainer from "../HiddenContainer";
import { useFormConstructor } from "@/app/store/useFormConstructor";
import { MAX_COLUMNS } from "@/shared/constants";

type Props<T extends SettingsFieldsStatic> = {
    buttonsBlock?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: (e: PointerEvent) => void;
    form?: FormInstance;
    componentConfiguration: ComponentConfigWithState<T>;
    isPaletteMode?: boolean;
};

const FieldWithButton = <T extends SettingsFieldsStatic>(props: Props<T>) => {
    const {
        componentConfiguration: { Component, data: fieldValues, config },
        buttonsBlock,
        form,
        isPaletteMode,
        style,
    } = props;

    const value = config.hide?.field
        ? form?.getFieldValue(config.hide.field)
        : null;

    const isHidden = useMemo(() => {
        if (!config.hide) return false;

        const { type, value: hideValue } = config.hide;

        return (
            {
                full: !!value,
                empty: !value,
                equal: hideValue === value,
            }[type] ?? false
        );
    }, [value, form, config]);

    const { formState } = useFormConstructor();

    const actualColumnLength = useMemo(() => {
        if (
            fieldValues.columnsLength === 0 ||
            !formState.columnLength ||
            isPaletteMode
        )
            return 24;
        return (
            fieldValues.columnsLength * (MAX_COLUMNS / +formState.columnLength)
        );
    }, [formState.columnLength, fieldValues.columnsLength, isPaletteMode]);

    return (
        <Col span={actualColumnLength}>
            <ComponentWithButtons
                className={styles.container}
                style={style}
                buttonsBlock={buttonsBlock}
            >
                <HiddenContainer isHidden={isHidden}>
                    <FormFieldFabric
                        Component={Component}
                        fieldValues={fieldValues}
                    />
                </HiddenContainer>
            </ComponentWithButtons>
        </Col>
    );
};

export default FieldWithButton;
