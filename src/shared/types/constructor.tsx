import type { commonProps } from "@/entities/FormConstructor/constants";
import type { IOption } from "./selelct";
import React from "react";
import type { fieldVariantsOptions, FormState } from "../constants";

export type FieldType = "checkbox" | "input" | "number" | "select" | "options";

export type GetFieldValueType<T extends FieldType> = T extends "checkbox"
    ? boolean
    : T extends "number"
    ? number
    : T extends "options"
    ? IOption[]
    : string;

export type SettingsField<
    K extends FieldType = "checkbox" | "input" | "number" | "select" | "options"
> = {
    type: K;
    propertyName: string;
    placeholder?: string;
    defaultValue?: GetFieldValueType<K>;
    labelText: string;
    dependsOn?: DependedValue<K>[];
};

export type DependedValue<
    K extends FieldType,
    T extends FieldType = "checkbox" | "input" | "number" | "select" | "options"
> = {
    propertyName: string;
    type: T;
    triggeredValue: GetFieldValueType<T>;
    callback: (
        val: GetFieldValueType<K>,
        dependedValue?: GetFieldValueType<T>
    ) => GetFieldValueType<K>;
};

export type SettingsFieldsStatic = readonly FieldProps[];

export type InputFieldProps = SettingsField<"input"> &
    OptionProps<{ maxLength: number; minLength: number }>;

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
    optionsGenerator?: (formSettings: Record<string, any>) => Partial<T>;
};

export type OptionCreatorFieldProps = SettingsField<"options"> &
    OptionProps<{ maxLength: number }>;

export const isOptionCreatorField = (
    item: SettingsField
): item is OptionCreatorFieldProps => {
    return item.type === "options";
};

export type FieldProps =
    | InputFieldProps
    | NumberFieldProps
    | CheckboxFieldProps
    | SelectFieldProps
    | OptionCreatorFieldProps;

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
    config: {
        hide?: {
            type: FieldVariant;
            field: string;
            value: string | null;
        };
    };
};

export type FieldVariant = (typeof fieldVariantsOptions)[number]["value"];

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
