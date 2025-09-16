import type { SettingsFieldsStatic } from "@/shared/types/constructor";

export const inputSettings = [
    {
        type: "number",
        defaultValue: 1,
        propertyName: "borderWidth",
        labelText: "Толщина рамки",
    },
] as const satisfies SettingsFieldsStatic;

export type InputSettingsProps = typeof inputSettings;
export const componentName: string = 'Input';