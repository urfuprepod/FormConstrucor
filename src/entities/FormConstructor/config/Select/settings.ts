import type { SettingsFieldsStatic } from "@/shared/types/constructor";

export const selectSettings = [
    {
        type: "input",
        defaultValue: "Не найдено",
        propertyName: "notFoundContent",
        labelText: "Текст при отсутствии результатов",
    },
    {
        type: "checkbox",
        propertyName: "loading",
        labelText: "Статус загрузки",
        dependsOn: [
            {
                type: "input",
                triggeredValue: "2",
                propertyName: "notFoundContent",
                callback: () => false,
            },
        ],
    },
    {
        type: "options",
        propertyName: "values",
        labelText: "Значения для выбора",
    },
] as const satisfies SettingsFieldsStatic;

export type SelectSettingsProps = typeof selectSettings;
export const componentName: string = "Select";
