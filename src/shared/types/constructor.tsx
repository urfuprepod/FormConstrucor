import type { commonProps } from "@/entities/FormConstructor/constants";


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
