import {
    generateLabelName,
    getSettingsValues,
    parseJson,
} from "@/shared/methods";
import type {
    Arch,
    ComponentConfig,
    ComponentConfigWithStateArray,
    ComponentConfigWithState,
    SettingsFieldsStatic,
    ComponentConfigWithStateArrayDTO,
} from "@/shared/types/constructor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { commonPropsToObjectForm } from "../constants";
import { fieldsList } from "../config";

export function useComponentConfig(
    activePositionNumber: number | null,
    initialFunction?: () => Promise<string>
) {
    const [fields, setFields] = useState<ComponentConfigWithStateArray>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (initialFunction) {
            setIsLoading(true);
            initialFunction()
                .then(parseJson<ComponentConfigWithStateArrayDTO>)
                .then((data) =>
                    setFields(
                        data.map((el) => ({
                            ...el,
                            Component: fieldsList.find(
                                (item) => item.name === el.name
                            )!
                                .Component as ComponentConfigWithState<SettingsFieldsStatic>["Component"],
                        }))
                    )
                )
                .finally(() => setIsLoading(false));
        }
    }, [initialFunction]);

    const pushNewField = useCallback(
        <T extends SettingsFieldsStatic>(config: ComponentConfig<T>) => {
            const data = {
                ...getSettingsValues([...config.settings]),
                ...commonPropsToObjectForm,
            };

            data.label = generateLabelName();

            setFields((prev) => [
                ...prev,
                {
                    ...config,
                    position: prev.length + 1,
                    data,
                } as ComponentConfigWithState<SettingsFieldsStatic>,
            ]);
        },
        [setFields]
    );

    const unshiftNewField = useCallback(
        <T extends SettingsFieldsStatic>(config: ComponentConfig<T>) => {
            setFields((prev) => {
                const actual = [
                    {
                        ...config,
                        position: 1,
                        data: {
                            ...getSettingsValues([...config.settings]),
                            ...commonPropsToObjectForm,
                        },
                    } as ComponentConfigWithState<SettingsFieldsStatic>,
                    ...prev.map((item) => ({
                        ...item,
                        position: item.position + 1,
                    })),
                ];

                return actual;
            });
        },
        [setFields]
    );

    const updateField = <T extends SettingsFieldsStatic>(
        positionNumber: number,
        data: Arch<T>
    ) => {
        setFields((prev) =>
            prev.map((field) =>
                field.position === positionNumber ? { ...field, data } : field
            )
        );
    };

    const updateConfig = <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => {
        setFields((prev) =>
            prev.map((field) =>
                field.position === positionNumber
                    ? { ...field, config: { ...field.config, [key]: val } }
                    : field
            )
        );
    };

    const removeField = (positionNumber: number) => {
        setFields((prev) => {
            const actualFields = prev.reduce(
                (acc: ComponentConfigWithStateArray, cur) => {
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
            return actualFields;
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
        isLoadingFields: isLoading,
        updateConfig
    };
}
