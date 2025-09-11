import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { Select } from "antd";
import { type FC } from "react";

type Props = EditingFieldProps<"select">;

const EditingSelect: FC<Props> = (props) => {
    const { placeholder, propertyName, value, onChange, options, maxCount } =
        props;

    return (
        <Select<string>
            placeholder={placeholder}
            value={value}
            mode={maxCount && maxCount > 1 ? "multiple" : undefined}
            maxCount={maxCount}
            id={propertyName}
            onChange={onChange}
            options={options}
        />
    );
};

export default EditingSelect;
