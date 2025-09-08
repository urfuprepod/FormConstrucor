import { getSettingsValues } from "@/shared/methods";

export const commonProps = [
    {
        type: "input",
        propertyName: "name",
        labelText: "Имя поля",
        placeholder: "Введите имя...",
    },
    {
        type: "checkbox",
        propertyName: "isDisabled",
        labelText: "Заблокировано",
    },
    {
        type: "input",
        propertyName: "placeholder",
        labelText: "Значение placeholder",
        placeholder: "Введите placeholder...",
    },
    {
        type: "checkbox",
        propertyName: "required",
        labelText: "Поле обязательно к заполнению",
    },
    {
        type: "input",
        propertyName: "label",
        labelText: "Значение label для поля",
        placeholder: "Введите label или оставьте пустым",
        defaultValue: "Form Label",
    },
] as const;

export const commonPropsToObjectForm = getSettingsValues(commonProps);
