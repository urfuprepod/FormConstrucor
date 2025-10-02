import { getSettingsValues } from "@/shared/methods";
import type { SettingsFieldsStatic } from "@/shared/types/constructor";

export const commonProps = [
    {
        type: "input",
        propertyName: "name",
        labelText: "Имя поля",
        placeholder: "Введите имя...",
        options: {
            maxLength: 12,
        },
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
    // {
    //     type: "number",
    //     propertyName: "columnsLength",
    //     labelText: "Количество занимаемых колонок",
    //     placeholder: "Кол-во колонок",
    //     defaultValue: 1,
    //     optionsGenerator: (form) => {
    //         return {
    //             min: 1,
    //             max: +form.columnLength,
    //         };
    //     },
    // },
] as const satisfies SettingsFieldsStatic;

export const commonPropsToObjectForm = getSettingsValues(commonProps);
