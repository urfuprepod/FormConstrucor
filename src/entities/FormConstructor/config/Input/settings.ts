export const inputSettings = [
    {
        type: "number",
        defaultValue: 1,
        propertyName: "borderWidth",
        labelText: "Толщина рамки",
    },
] as const;

export type InputSettingsProps = typeof inputSettings;
export const componentName: string = 'Input';