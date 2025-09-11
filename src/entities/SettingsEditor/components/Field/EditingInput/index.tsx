import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { Input } from "antd";
import { type FC } from "react";

type Props = EditingFieldProps<"input">;

const EditingField: FC<Props> = (props) => {
    const { propertyName, value, onChange, maxLength, minLength, placeholder } =
        props;

    return (
        <Input
            id={propertyName}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            name={propertyName}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default EditingField;
