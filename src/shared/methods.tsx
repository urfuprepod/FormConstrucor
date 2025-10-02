import type { FC } from "react";
import type {
    ComponentConfig,
    ComponentConfigWithStateArray,
    ObjectSettingsFormType,
    SettingsFieldsStatic,
} from "./types/constructor";
import type { Active } from "@dnd-kit/core";
import type { DraggableType } from "./types/draggable";

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

export const parseJson = <T,>(data: string) => {
    return JSON.parse(data) as T;
};

// данная фабрика помогает сохарнить конкретный generic-тип элемента, а не объединять их все в один union-тип в массиве
export const defineComponent = <T extends SettingsFieldsStatic>(
    cfg: ComponentConfig<T>
) => {
    return cfg;
};

const messages = [
    "ложка",
    "трава",
    "меч",
    "соль",
    "ключ",
    "архангел",
    "монополия",
    "бункер",
    "торжество",
];

export const generateLabelName = (): string => {
    const first = Math.floor(Math.random() * messages.length);

    let second = Math.floor(Math.random() * messages.length);
    while (second === first) {
        second = Math.floor(Math.random() * messages.length);
    }

    return [messages[first], messages[second]].join(" ");
};

export const checkSideTypeByItemAndCenterPosition = <
    T extends { active: Active }
>(
    item: T,
    centerDrop: number
): DraggableType => {
    const translatedLeft = item.active.rect.current.translated?.left;
    if (!translatedLeft) return "startRow";
    return translatedLeft < centerDrop ? "startRow" : "endRow";
};

type Edited<T> = {
    currentId: string;
    itemData: Partial<T>;
};

export const editAddItemToArrayWithIdConstructor = <
    T extends { id: string } & Record<string, any>
>(
    items: T[],
    config:
        | {
              itemData: T;
          }
        | Edited<T>
): T[] => {
    if (!(config as Edited<T>).currentId) {
        return items.concat(
            (
                config as {
                    itemData: T;
                }
            ).itemData
        );
    }

    const predictedConfig = config as Edited<T>;

    return items.map((el) =>
        el.id === predictedConfig.currentId ? { ...el, ...config.itemData } : el
    );
};
