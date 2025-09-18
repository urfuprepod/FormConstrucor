import type { EditingFieldProps } from "@/entities/SettingsEditor/types";
import { InputNumber } from "antd";
import { useEffect, type FC } from "react";

type Props = EditingFieldProps<"number">;

const EditingInputNumber: FC<Props> = (props) => {
    const { placeholder, value, onChange, propertyName, min, max, step } =
        props;

    useEffect(() => {
        if (min && value && value < min) return onChange(min);
        if (max && ((value && value > max) || !value)) return onChange(max);
    }, [min, max, value]);

    return (
        <>
            <InputNumber
                value={String(value ?? "0")}
                step={step}
                min={String(min ?? 0)}
                max={String(max) ?? undefined}
                name={propertyName}
                id={propertyName}
                placeholder={placeholder}
                onChange={(val) => onChange(+(val ?? 0))}
            />
        </>
    );
};

export default EditingInputNumber;
