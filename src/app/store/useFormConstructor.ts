import { commonPropsToObjectForm } from "@/entities/FormConstructor/constants";
import {
    formFieldSetting,
    type FormState,
    type FormStateKeys,
} from "@/shared/constants";
import {
    getSettingsValues,
    generateLabelName,
    findActualIndexOnFields,
    mutatePositionNeighbours,
} from "@/shared/methods";
import type {
    Arch,
    ComponentConfig,
    ComponentConfigWithState,
    ComponentConfigWithStateArray,
    FieldType,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import type { DraggableType } from "@/shared/types/draggable";
import { checkActualValue } from "@/shared/types/formState";
import { create } from "zustand";

type DraggableItem = {
    type: null | "field" | "grid" | "col";
    id: null | string;
};

interface IFormConstructorState {
    fields: ComponentConfigWithStateArray;
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => void;
    pushAndReplaceField: <T extends SettingsFieldsStatic>(
        config: ComponentConfig<T>,
        rowNumber?: number,
        pushedOn?: DraggableType,
        positionData?: {
            oldPositionId?: number;
            endPositionId?: number;
        }
    ) => void;
    unshiftNewField: <T extends SettingsFieldsStatic>(
        config: ComponentConfig<T>
    ) => void;
    updateField: <T extends SettingsFieldsStatic>(
        positionNumber: number,
        data: Arch<T>
    ) => void;
    updateFieldLayout: (
        positionNumber: number,
        updatedFields: {
            positionNumber?: number | undefined;
            rowNumber?: number | undefined;
        }
    ) => void;
    removeField: (positionNumber: number) => void;
    rowNumber: number;
    formState: FormState;
    mutate: <K extends FieldType>(key: string, type: K, val: unknown) => void;
    cols: IConstructorColumn[];
    grids: IConstructorGrid[];
    activePositionNumber: number | null;
    activeDraggableItem: DraggableItem;
    updateDraggableItem: (val?: DraggableItem) => void;
    updatePositionNumber: (val?: number) => void;
}

export const useFormConstructor = create<IFormConstructorState>((set) => ({
    fields: [],
    rowNumber: 0,
    cols: [],
    grids: [{ colNumber: null, id: "sex" }],
    activeDraggableItem: { type: null, id: null },
    activePositionNumber: null,
    updateDraggableItem: (val) => {
        set(() => ({ activeDraggableItem: val ?? { type: null, id: null } }));
    },
    updatePositionNumber(val) {
        set(() => ({ activePositionNumber: val ?? null }));
    },
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => {
        set((state) => {
            return {
                fields: state.fields.map((field) =>
                    field.position === positionNumber
                        ? { ...field, config: { ...field.config, [key]: val } }
                        : field
                ),
            };
        });
    },
    updateFieldLayout: (
        positionNumber: number,
        updatedFields: {
            positionNumber?: number | undefined;
            rowNumber?: number | undefined;
        }
    ) => {
        set((state) => {
            return {
                fields: state.fields.map((field) =>
                    field.position === positionNumber
                        ? { ...field, ...updatedFields }
                        : field
                ),
            };
        });
    },
    pushAndReplaceField: <T extends SettingsFieldsStatic>(
        config: ComponentConfig<T>,
        rowNumber?: number,
        pushedOn?: DraggableType,
        positionData?: {
            oldPositionId?: number;
            endPositionId?: number;
        }
    ) => {
        const data = {
            ...commonPropsToObjectForm,
            ...getSettingsValues([...config.settings]),
        };

        if (!positionData?.oldPositionId) {
            data.label = generateLabelName();
        }

        set((state) => {
            const actualPosition =
                pushedOn && rowNumber && positionData?.endPositionId
                    ? findActualIndexOnFields(
                          positionData?.endPositionId,
                          pushedOn,
                          positionData.oldPositionId
                      )
                    : positionData?.oldPositionId
                    ? state.fields.length
                    : state.fields.length + 1;

            console.log(actualPosition, positionData?.oldPositionId);
            const newFieldItem = {
                ...config,
                position: actualPosition,
                rowNumber: rowNumber ?? state.rowNumber + 1,
                data,
            } as ComponentConfigWithState<SettingsFieldsStatic>;

            if (positionData?.oldPositionId !== undefined) {
                const { oldPositionId } = positionData;
                return {
                    fields: state.fields.map((el) =>
                        el.position === oldPositionId
                            ? {
                                  ...el,
                                  position: actualPosition,
                                  rowNumber: rowNumber ?? state.rowNumber + 1,
                              }
                            : {
                                  ...el,
                                  position: mutatePositionNeighbours(
                                      actualPosition,
                                      el.position,
                                      oldPositionId
                                  ),
                              }
                    ),
                };
            }

            return {
                fields: [
                    ...state.fields.map((el) => ({
                        ...el,
                        position: mutatePositionNeighbours(
                            actualPosition,
                            el.position,
                            undefined
                        ),
                    })),
                    newFieldItem,
                ],
                rowNumber: rowNumber ? state.rowNumber : state.rowNumber + 1, // если засунули в какую-то конкретную строку, то номер последней строки не изменился
            };
        });
    },
    removeField: (positionNumber: number) => {
        set((state) => {
            const actualFields = state.fields.reduce(
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

            return { fields: actualFields };
        });
    },
    updateField: <T extends SettingsFieldsStatic>(
        positionNumber: number,
        data: Arch<T>
    ) => {
        set((state) => {
            return {
                fields: state.fields.map((field) =>
                    field.position === positionNumber
                        ? { ...field, data }
                        : field
                ),
            };
        });
    },
    unshiftNewField: <T extends SettingsFieldsStatic>(
        config: ComponentConfig<T>
    ) => {
        set((state) => {
            return {
                fields: [
                    {
                        ...config,
                        position: 1,
                        rowNumber: 1,
                        data: {
                            ...getSettingsValues([...config.settings]),
                            ...commonPropsToObjectForm,
                        },
                    } as ComponentConfigWithState<SettingsFieldsStatic>,
                    ...state.fields.map((item) => ({
                        ...item,
                        position: item.position + 1,
                    })),
                ],
            };
        });
    },
    formState: getSettingsValues(formFieldSetting),
    mutate: (key, type, value) => {
        set((state) => {
            const keyState = key as FormStateKeys;
            if (checkActualValue(keyState, type, value)) {
                return { formState: { ...state.formState, [keyState]: value } };
            }
            return {};
        });
    },
}));
