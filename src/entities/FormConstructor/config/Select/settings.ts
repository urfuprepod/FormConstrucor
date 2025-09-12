
export const selectSettings = [
    {
        type: "input",
        defaultValue: 'Не найдено',
        propertyName: "notFoundContent",
        labelText: "Текст при отсутствии результатов",
    },
    {
        type: "checkbox",
        propertyName: 'loading',
        labelText: 'Статус загрузки'
    },
    {
        type: 'options',
        propertyName: 'values',
        labelText: 'Значения для выбора'

    }
    
] as const;

export type SelectSettingsProps = typeof selectSettings;
export const componentName: string = 'Select';