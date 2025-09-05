import type { FC } from "react";

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

export function updateField<T extends object, K extends keyof T>(
    obj: T,
    key: K,
    val: T[K]
): T {
    return { ...obj, [key]: val };
}
