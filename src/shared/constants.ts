import type {
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
        labelText: "Расстояние между колонками",
    },
    {
        type: "select",
        propertyName: "columnLength",
        labelText: "Количество колонок",
        defaultValue: "24",
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
