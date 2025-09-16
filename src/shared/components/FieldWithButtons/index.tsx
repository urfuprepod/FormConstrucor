import FormFieldFabric from "@/shared/FormFieldFabric";
import type {
    ComponentConfig,
    Arch,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import React from "react";
import ComponentWithButtons from "../ComponentWithButtons";
import styles from "./style.module.css";

type Props<T extends SettingsFieldsStatic> = {
    Component: ComponentConfig<T>["Component"];
    fieldValues: Arch<T>;
    buttonsBlock?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: (e: PointerEvent) => void;
};

const FieldWithButton = <T extends SettingsFieldsStatic>(props: Props<T>) => {
    const { Component, fieldValues, buttonsBlock, style } = props;

    return (
        <ComponentWithButtons
            className={styles.container}
            style={style}
            buttonsBlock={buttonsBlock}
        >
            <FormFieldFabric Component={Component} fieldValues={fieldValues} />
        </ComponentWithButtons>
    );
};

export default FieldWithButton;
