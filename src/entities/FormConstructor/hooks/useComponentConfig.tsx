import {
    flattenAndFind,
    flattenAndProcess,
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
    const [fields, setFields] = useState<ComponentConfigWithStateArray[]>([[]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     if (initialFunction) {
    //         setIsLoading(true);
    //         initialFunction()
    //             .then(parseJson<ComponentConfigWithStateArrayDTO>)
    //             .then((data) =>
    //                 setFields(
    //                     data.map((el) => ({
    //                         ...el,
    //                         Component: fieldsList.find(
    //                             (item) => item.name === el.name
    //                         )!
    //                             .Component as ComponentConfigWithState<SettingsFieldsStatic>["Component"],
    //                     }))
    //                 )
    //             )
    //             .finally(() => setIsLoading(false));
    //     }
    // }, [initialFunction]);

    const pushNewField = useCallback(
        <T extends SettingsFieldsStatic>(config: ComponentConfig<T>) => {
            const data = {
                ...getSettingsValues([...config.settings]),
                ...commonPropsToObjectForm,
            };

            data.label = generateLabelName();

            setFields((prev) => {
                const lastElem = prev.at(-1);
                if (!lastElem) return prev;
                const newItem = {
                    ...config,
                    position: prev.length + 1,
                    data,
                } as ComponentConfigWithState<SettingsFieldsStatic>;
                return prev.slice(0, -1).concat([...lastElem, newItem]);
            });
        },
        [setFields]
    );

    const unshiftNewField = useCallback(
        <T extends SettingsFieldsStatic>(config: ComponentConfig<T>) => {
            setFields((prev) => {
                const firstElem = prev.at(0);
                if (!firstElem) return prev;

                const newItem = {
                    ...config,
                    position: 1,
                    data: {
                        ...getSettingsValues([...config.settings]),
                        ...commonPropsToObjectForm,
                    },
                } as ComponentConfigWithState<SettingsFieldsStatic>;

                return [
                    [newItem, ...firstElem],
                    ...prev.slice(1).map((block) =>
                        block.map((item) => ({
                            ...item,
                            position: item.position + 1,
                        }))
                    ),
                ];
            });
        },
        [setFields]
    );

    const updateField = <T extends SettingsFieldsStatic>(
        positionNumber: number,
        data: Arch<T>
    ) => {
        setFields((prev) =>
            flattenAndProcess(
                prev,
                (field: ComponentConfigWithState<SettingsFieldsStatic>) =>
                    ({
                        ...field,
                        data,
                    } as ComponentConfigWithState<SettingsFieldsStatic>),
                positionNumber,
                "position"
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
            flattenAndProcess(
                prev,
                (field: ComponentConfigWithState<SettingsFieldsStatic>) => ({
                    ...field,
                    config: { ...field.config, [key]: val },
                }),
                positionNumber,
                "position"
            )
        );
    };

    const removeField = (positionNumber: number) => {
        setFields((prev) => {

            prev.map(rowField => {
                
            })

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
            result = flattenAndFind(fields, activePositionNumber, "position");
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
        updateConfig,
    };
}
