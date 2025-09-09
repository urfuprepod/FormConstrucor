import type { FC } from "react";
import type { ObjectSettingsFormType, SettingsFieldsStatic } from "./types";

export function downloadJson(data: object, filename = "form") {
    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function partialProps<P extends object, K extends keyof P>(
    Component: FC<P>,
    partial: Pick<P, K>
): FC<Omit<P, K>> {
    return (props) => {
        return <Component {...partial} {...(props as P)} />;
    };
}

export const getSettingsValues = <T extends SettingsFieldsStatic>(
    settings: T
): ObjectSettingsFormType<T> => {
    return settings.reduce((acc, field) => {
        const defaultValue = field.defaultValue as NonNullable<
            T[number]["defaultValue"]
        >;

        return {
            ...acc,
            [field.propertyName]: defaultValue,
        };
    }, {} as ObjectSettingsFormType<T>);
};
