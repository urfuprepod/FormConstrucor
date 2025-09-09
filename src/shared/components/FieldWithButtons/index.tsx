import FormFieldFabric from "@/shared/FormFieldFabric";
import type {
    ComponentConfig,
    Arch,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { Flex } from "antd";
import React from "react";

type Props<T extends SettingsFieldsStatic> = {
    Component: ComponentConfig<T>["Component"];
    fieldValues: Arch<T>;
    buttonsBlock?: React.ReactNode;
};

const FieldWithButton = <T extends SettingsFieldsStatic>(props: Props<T>) => {
    const { Component, fieldValues, buttonsBlock } = props;
    return (
        <Flex gap={7} align="end">
            <FormFieldFabric Component={Component} fieldValues={fieldValues} />
            {buttonsBlock}
        </Flex>
    );
};

export default FieldWithButton;
