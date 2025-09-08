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

export type ObjectSettingsFormType<T extends readonly SettingsField[]> = {
    [K in T[number]["propertyName"]]: NonNullable<
        GetFieldValueType<Extract<T[number], { propertyName: K }>["type"]>
    >;
};

export type Ahue<T extends readonly SettingsField[]> = {
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

type ConfigComponent<T extends readonly SettingsField[]> = React.ComponentType<
    Ahue<T>
>;

export type ComponentConfig<T extends readonly SettingsField[]> = {
    Component: ConfigComponent<T>;
    settings: T;
};

export type ComponentConfigWithState<T extends readonly SettingsField[]> =
    ComponentConfig<T> & { position: number; data: Ahue<T> };

export type ComponentConfigArray = Array<
    ComponentConfigWithState<readonly SettingsField[]>
>;
