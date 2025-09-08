
export const selectSettings = [
    {
        type: "input",
        defaultValue: 'Не найдено',
        propertyName: "notFoundContent",
        labelText: "Текст при отсутствии результатов",
    },
    
] as const;

export type SelectSettingsProps = typeof selectSettings;
