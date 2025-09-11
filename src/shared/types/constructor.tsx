import type { commonProps } from "@/entities/FormConstructor/constants";
import type { FC } from "react";
import type { IOption } from "./selelct";
import React from "react";
import { Input } from "antd";

export type FieldType = "checkbox" | "input" | "number" | "select";

export type GetFieldValueType<T extends FieldType> = T extends "checkbox"
    ? boolean
    : T extends "number"
    ? number
    : string;

export type SettingsField<
    K extends FieldType = "checkbox" | "input" | "number" | "select"
> = {
    type: K;
    propertyName: string;
    placeholder?: string;
    defaultValue?: GetFieldValueType<K>;
    labelText: string;
};

export type SettingsFieldsStatic = readonly FieldProps[];

export type InputFieldProps = SettingsField<"input"> & {
    options?: { maxLength?: number; minLength?: number };
};

export const isInputField = (item: SettingsField): item is InputFieldProps => {
    return item.type === "input";
};

export type NumberFieldProps = SettingsField<"number"> &
    OptionProps<{ min: number; max: number; step: number }>;
export const isNumberField = (
    item: SettingsField
): item is NumberFieldProps => {
    return item.type === "number";
};

export const isCheckboxField = (
    item: SettingsField
): item is CheckboxFieldProps => {
    return item.type === "checkbox";
};

export type CheckboxFieldProps = SettingsField<"checkbox"> & OptionProps<{}>;

export type SelectFieldProps = SettingsField<"select"> &
    OptionProps<{ maxCount: number; options: IOption[] }>;
export const isSelectField = (
    item: SettingsField
): item is SelectFieldProps => {
    return item.type === "select";
};

type OptionProps<T extends Record<string, any>> = {
    options?: Partial<T>;
};

// type C = {
//     [K in FieldType]: [
//         (item: SettingsField<FieldType>) => item is FindAdvanced<K>,
//         FC<FindAdvanced<K>["options"] & Pick<SettingsField, 'placeholder' | 'propertyName'> & { onChange: (val: any) => void }>
//     ];
// };

// const a: C = {
//     input: [
//         isInputField,
//         () => <Input
//             id={propertyName}
//             value={value}
//             minLength={field.options?.minLength}
//             maxLength={field.options?.maxLength}
//             name={propertyName}
//             placeholder={placeholder}
//             onChange={(e) => onChange(e.target.value)}
//         />,
//     ],
// };

// const b: FieldProps[] = [];

// b.map((el) =>
//     check(el, a[el.type][0], a[el.type][1])
//         ? React.createElement(a[el.type][1], {
//               ...el.options,
//               placeholder: '',
//               propertyName: '',
//               onChange: () => {},
//           })
//         : null
// );

// function check<T extends FieldType>(
//     ac: FieldProps,
//     b: (item: SettingsField<FieldType>) => item is FindAdvanced<T>,
//     c: FC<FindAdvanced<K>["options"] & Pick<SettingsField, 'placeholder' | 'propertyName'> & { onChange: (val: any) => void }>
// ) {
//     if (b(ac)) return c;
//     return null;
// }

export type FieldProps =
    | InputFieldProps
    | NumberFieldProps
    | CheckboxFieldProps
    | SelectFieldProps;

export type ObjectSettingsFormType<T extends SettingsFieldsStatic> = {
    [K in T[number]["propertyName"]]: NonNullable<
        GetFieldValueType<Extract<T[number], { propertyName: K }>["type"]>
    >;
};

export type Arch<T extends SettingsFieldsStatic> = {
    [K in T[number]["propertyName"]]: NonNullable<
        GetFieldValueType<Extract<T[number], { propertyName: K }>["type"]>
    >;
} & {
    [K in (typeof commonProps)[number]["propertyName"]]: NonNullable<
        GetFieldValueType<
            Extract<(typeof commonProps)[number], { propertyName: K }>["type"]
        >
    >;
};

export type ComponentConfig<T extends SettingsFieldsStatic> = {
    Component: React.FC<Arch<T>>;
    settings: T;
    name: string;
};

export type ComponentConfigArray = Array<ComponentConfig<SettingsFieldsStatic>>;

export type ComponentConfigWithState<T extends SettingsFieldsStatic> =
    ComponentConfig<T> & { position: number; data: Arch<T> };

export type ComponentConfigWithStateArray = Array<
    ComponentConfigWithState<SettingsFieldsStatic>
>;

export type ComponentConfigWithStateDTO<T extends SettingsFieldsStatic> = Omit<
    ComponentConfigWithState<T>,
    "Component"
>;

export type ComponentConfigWithStateArrayDTO = Array<
    ComponentConfigWithStateDTO<SettingsFieldsStatic>
>;
