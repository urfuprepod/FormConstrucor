import FormFieldFabric from "@/shared/FormFieldFabric";
import type { SettingsField, ComponentConfig, Ahue } from "@/shared/types";
import { Flex } from "antd";
import React from "react";

type Props<T extends readonly SettingsField[]> = {
    Component: ComponentConfig<T>["Component"];
    fieldValues: Ahue<T>;
    buttonsBlock?: React.ReactNode;
};

const FieldWithButton = <T extends readonly SettingsField[]>(
    props: Props<T>
) => {
    const { Component, fieldValues, buttonsBlock } = props;
    return (
        <Flex gap={7} align="end">
            <FormFieldFabric
                Component={Component}
                fieldValues={fieldValues}
            />
            {buttonsBlock}
        </Flex>
    );
};

export default FieldWithButton;
