import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { Checkbox } from "antd";
import React, { type FC } from "react";

type Props = EditingFieldProps<"checkbox">;

const EditingCheckbox: FC<Props> = (props) => {
    const { value, onChange, propertyName } = props;

    return (
        <Checkbox
            id={propertyName}
            checked={value}
            name={propertyName}
            onChange={(e) => onChange(e.target.checked)}
        />
    );
};

export default EditingCheckbox;
