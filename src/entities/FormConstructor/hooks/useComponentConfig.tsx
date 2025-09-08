import { getSettingsValues } from "@/shared/methods";
import type {
    Ahue,
    ComponentConfig,
    ComponentConfigArray,
    ComponentConfigWithState,
    SettingsField,
} from "@/shared/types";
import { useMemo, useState } from "react";
import { commonPropsToObjectForm } from "../constants";

export function useComponentConfig(activePositionNumber: number | null) {
    const [fields, setFields] = useState<ComponentConfigArray>([]);

    const pushNewField = <T extends readonly SettingsField[]>(
        config: ComponentConfig<T>
    ) => {
        setFields((prev) => [
            ...prev,
            {
                position: prev.length + 1,
                Component: config.Component,
                settings: config.settings,
                data: {
                    ...getSettingsValues([...config.settings]),
                    ...commonPropsToObjectForm,
                },
            } as ComponentConfigWithState<readonly SettingsField[]>,
        ]);
    };

    const unshiftNewField = <T extends readonly SettingsField[]>(
        config: ComponentConfig<T>
    ) => {
        setFields((prev) => {
            const actual = [
                {
                    position: 1,
                    Component: config.Component,
                    settings: config.settings,
                    data: {
                        ...getSettingsValues([...config.settings]),
                        ...commonPropsToObjectForm,
                    },
                } as ComponentConfigWithState<readonly SettingsField[]>,
                ...prev.map((item) => ({
                    ...item,
                    position: item.position + 1,
                })),
            ];

            return actual;
        });
    };

    const updateField = <T extends readonly SettingsField[]>(
        positionNumber: number,
        data: Ahue<T>
    ) => {
        setFields((prev) =>
            prev.map((field) =>
                field.position === positionNumber
                    ? { ...field, data }
                    : field
            )
        );
    };

    const removeField = (positionNumber: number) => {
        setFields((prev) => {
            const actualFields = prev.reduce(
                (acc: ComponentConfigArray, cur) => {
                    if (cur.position === positionNumber) return acc;
                    if (cur.position < positionNumber) return acc.concat(cur);
                    if (cur.position > positionNumber)
                        return acc.concat({
                            ...cur,
                            position: cur.position - 1,
                        });
                    return acc;
                },
                []
            );
            return { ...prev, fields: actualFields };
        });
    };

    const activeField = useMemo(() => {
        let result = undefined;

        if (activePositionNumber !== null) {
            result = fields.find((el) => el.position === activePositionNumber);
        }

        return result;
    }, [fields, activePositionNumber]);

    return {
        fields,
        pushNewField,
        updateField,
        activeField,
        removeField,
        unshiftNewField,
    };
}
