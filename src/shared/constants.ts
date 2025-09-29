import type {
    FieldType,
    ObjectSettingsFormType,
    SettingsFieldsStatic,
} from "./types/constructor";
import type { IOption } from "./types/selelct";

export const fieldVariantsOptions = [
    { label: "Поле пустое/0/false", value: "empty" },
    { label: "Поле имеет значение", value: "full" },
    { label: "Поле равняется", value: "equal" },
] as const satisfies IOption[];

export const MAX_COLUMNS: number = 24;

export const formFieldSetting = [
    {
        type: "number",
        defaultValue: 6,
        propertyName: "gap",
        labelText: "Расстояние между колонками (бп)",
    },
    {
        type: "number",
        defaultValue: 12,
        propertyName: "space",
        labelText: "Расстояние между строками (px)",
    },
    {
        type: "select",
        propertyName: "columnLength",
        labelText: "Количество колонок",
        defaultValue: "2",
        options: {
            options: [
                { label: "2", value: "2" },
                { label: "4", value: "4" },
                { label: "12", value: "12" },
                { label: "24", value: "24" },
            ],
        },
    },
] as const satisfies SettingsFieldsStatic;

export type FormStateSettings = typeof formFieldSetting;
export type FormState = ObjectSettingsFormType<FormStateSettings>;
export type FormStateKeys = keyof FormState;

export const typeMap: Record<FieldType, (val: unknown) => boolean> = {
    checkbox: (v) => typeof v === "boolean",
    number: (v) => typeof v === "number",
    options: (v) => Array.isArray(v),
    input: (v) => typeof v === "string",
    select: (v) => typeof v === "string",
};

// text data

export const rowCreationLabelText = `Добавить строку`;