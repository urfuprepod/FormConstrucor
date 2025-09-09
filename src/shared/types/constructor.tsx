import type { commonProps } from "@/entities/FormConstructor/constants";
import type { FC } from "react";

export interface IFormSettings {
    borderWidth?: number;
    direction?: "horizontal" | "vertical";
    gap?: number;
    submitText?: string;
}

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

type InputFieldProps = SettingsField<"input">;

type NumberFieldProps = SettingsField<"number">;

type CheckboxFieldProps = SettingsField<"checkbox">;

type SelectFieldProps = SettingsField<"select">;

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

type ConfigComponent<T extends SettingsFieldsStatic> = React.ComponentType<
    Arch<T>
>;

export type ComponentConfig<T extends SettingsFieldsStatic> = {
    Component: ConfigComponent<T>;
    settings: T;
};

export type ComponentConfigWithState<T extends SettingsFieldsStatic> =
    ComponentConfig<T> & { position: number; data: Arch<T> };

export type ComponentConfigArray = Array<
    ComponentConfigWithState<SettingsFieldsStatic>
>;
