import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { InputNumber } from "antd";
import { type FC } from "react";

type Props = EditingFieldProps<"number">;

const EditingInputNumber: FC<Props> = (props) => {
    const { placeholder, value, onChange, propertyName, min, max, step } =
        props;

    return (
        <InputNumber
            value={String(value)}
            step={step}
            min={String(min ?? 0)}
            max={String(max) ?? undefined}
            name={propertyName}
            id={propertyName}
            placeholder={placeholder}
            onChange={(val) => onChange(+(val ?? 0))}
        />
    );
};

export default EditingInputNumber;
