import type { FieldWithPosition } from "@/entities/FormConstructor/types";
import type { Field } from "@/entities/FormFieldFabric/types";
import DefaultSettings from "@/entities/SettingsEditor/components/DefaultSettings";
import { Flex } from "antd";
import React, { type FC } from "react";

type Props = {
    activeItem: FieldWithPosition;
    updateField: (positionNumber: number, updatedField: Field) => void;
};

const SettingsEditor: FC<Props> = (props) => {
    const { activeItem, updateField } = props;

    return (
        <Flex vertical gap={6}>
            <DefaultSettings
                activeItem={activeItem}
                updateField={updateField}
            />
        </Flex>
    );
};

export default SettingsEditor;
