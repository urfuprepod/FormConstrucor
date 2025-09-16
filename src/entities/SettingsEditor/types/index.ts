import type {
    FieldProps,
    FieldType,
    SettingsField,
} from "@/shared/types/constructor";
import type { FC } from "react";

type FindAdvanced<T extends FieldType> = FieldProps extends infer O
    ? O extends { type: T }
        ? O
        : never
    : never;

export type EditingFieldProps<T extends FieldType> =
    FindAdvanced<T>["options"] &
        Pick<SettingsField, "placeholder" | "propertyName"> & {
            onChange: (val: any) => void;
            value: FindAdvanced<T>["defaultValue"];
        };

export type EditingSettingsConfig = {
    [K in FieldType]: [
        (item: SettingsField<FieldType>) => item is FindAdvanced<K>,
        FC<EditingFieldProps<FieldType>>
    ];
};