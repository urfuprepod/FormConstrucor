import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { useDebounce } from "@/shared/hooks";
import { Input } from "antd";
import { type FC } from "react";

type Props = EditingFieldProps<"input">;

const EditingField: FC<Props> = (props) => {
    const { propertyName, value, onChange, maxLength, minLength, placeholder } =
        props;

    const { value: localValue, setValue } = useDebounce(value, onChange);

    return (
        <Input
            id={propertyName}
            value={localValue}
            minLength={minLength}
            maxLength={maxLength}
            name={propertyName}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default EditingField;
