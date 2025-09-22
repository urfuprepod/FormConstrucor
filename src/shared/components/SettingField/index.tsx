import { useFormConstructor } from "@/app/store/useFormConstructor";
import { editingFieldsDictionary } from "@/entities/SettingsEditor/constants";
import type { FieldProps, GetFieldValueType } from "@/shared/types/constructor";
import React, { type FC } from "react";
import {
    EditingCheckbox,
    EditingField,
    EditingInputNumber,
    EditingSelect,
} from "../Field";
import SelectOptionCreator from "../Field/EditingOptionCreator";

type Props<T extends FieldProps = FieldProps> = {
    field: T;
    value?: GetFieldValueType<T["type"]>;
    onChange: (val: T) => void;
};

const SettingField: FC<Props> = (props) => {
    const { field, value, onChange } = props;

    const { propertyName, placeholder } = field;

    const { formState } = useFormConstructor();

    const opts =
        field?.optionsGenerator?.(formState) ?? field.options ?? undefined;

    switch (field.type) {
        case "input":
            return (
                <EditingField
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...opts}
                    value={typeof value === "string" ? value : ""}
                />
            );
        case "checkbox":
            return (
                <EditingCheckbox
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...opts}
                    value={!!value}
                />
            );
        case "number":
            return (
                <EditingInputNumber
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...opts}
                    value={+(value ?? 0)}
                />
            );
        case "options":
            return (
                <SelectOptionCreator
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...opts}
                    value={Array.isArray(value) ? value : []}
                />
            );
        case "select":
            return (
                <EditingSelect
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...opts}
                    value={typeof value === "string" ? value : ""}
                />
            );
        default:
            const exhaustiveCheck: never = field;
            throw new Error(exhaustiveCheck);
    }
};

export default SettingField;
