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
    editAddItemToArrayWithIdConstructor,
} from "@/shared/methods";
import type {
    Arch,
    ComponentConfig,
    ComponentConfigWithState,
    ComponentConfigWithStateArray,
    FieldType,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import type { DraggableItem, DraggableType } from "@/shared/types/draggable";
import { checkActualValue } from "@/shared/types/formState";
import { create } from "zustand";

interface IFormConstructorState {
    fields: ComponentConfigWithStateArray;
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        fieldId: string,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => void;
    pushAndReplaceField: <T extends SettingsFieldsStatic>(
        config: ComponentConfig<T>,
        columnId: string,
        oldColumnId?: string
    ) => void;
    updateField: <T extends SettingsFieldsStatic>(
        fieldId: string,
        data: Arch<T>
    ) => void;
    updateFieldLayout: (
        fieldId: string,
        updatedFields: {
            positionNumber?: number | undefined;
            rowNumber?: number | undefined;
        }
    ) => void;
    removeField: (columnId: string) => void;
    rowNumber: number;
    formState: FormState;
    mutate: <K extends FieldType>(key: string, type: K, val: unknown) => void;
    cols: IConstructorColumn[];
    grids: IConstructorGrid[];
    activeFieldId: string | null;
    activeDraggableItem: DraggableItem;
    updateDraggableItem: (val?: DraggableItem) => void;
    updateFieldId: (val?: string) => void;

    updateCol: (
        colData: Partial<IConstructorColumn>,
        currentColId?: string
    ) => void;
    refreshCol: (columnId: string, targetColumnId?: string) => void;

    updateGrid: (gridData: IConstructorGrid, currentGridId?: string) => void;
}

export const useFormConstructor = create<IFormConstructorState>((set) => ({
    fields: [],
    rowNumber: 0,
    cols: [],
    updateCol(colData, currentColId) {
        set((state) => {
            const defaultNewItem = {
                id: String(new Date().toLocaleTimeString()),
                gridId: String(colData.gridId),
                rowNumber: 1,
                sectionWidth: 1,
                orderNumber: 1,
            };
            const value =
                editAddItemToArrayWithIdConstructor<IConstructorColumn>(
                    state.cols,
                    currentColId
                        ? { currentId: currentColId, itemData: colData }
                        : {
                              itemData: defaultNewItem,
                          }
                );

            return { cols: value };
        });
    },

    updateGrid(gridData) {
        set((state) => {
            const value = editAddItemToArrayWithIdConstructor<IConstructorGrid>(
                state.grids,
                { itemData: gridData }
            );

            return { grids: value };
        });
    },
    grids: [{ colId: null, id: "sex" }],
    activeDraggableItem: { type: null, id: null },
    activeFieldId: null,
    updateDraggableItem: (val) => {
        set(() => ({ activeDraggableItem: val ?? { type: null, id: null } }));
    },
    updateFieldId(val) {
        set(() => ({ activeFieldId: val ?? null }));
    },
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        fieldId: string,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => {
        set((state) => {
            return {
                fields: state.fields.map((field) =>
                    field.id === fieldId
                        ? { ...field, config: { ...field.config, [key]: val } }
                        : field
                ),
            };
        });
    },
    updateFieldLayout: (
        fieldId: string,
        updatedFields: {
            positionNumber?: number | undefined;
            rowNumber?: number | undefined;
        }
    ) => {
        set((state) => {
            return {
                fields: state.fields.map((field) =>
                    field.id === fieldId
                        ? { ...field, ...updatedFields }
                        : field
                ),
            };
        });
    },
    refreshCol(targetColumnId, columnId) {
        set((state) => {
            const statedCols = state.cols;
            const { orderNumber, gridId } = statedCols.find(
                (el) => el.id === targetColumnId
            )!;
            let actualColumns: IConstructorColumn[] = [];
            if (!columnId) {
                actualColumns = state.cols
                    .map((column) =>
                        column.gridId === gridId
                            ? {
                                  ...column,
                                  orderNumber:
                                      column.orderNumber >= orderNumber
                                          ? column.orderNumber + 1
                                          : column.orderNumber,
                              }
                            : column
                    )
                    .concat({
                        gridId,
                        orderNumber,
                        id: new Date().toISOString(),
                        sectionWidth: 1,
                        rowNumber: 1,
                    });
                return { cols: actualColumns };
            }
            for (let i = 0; i < statedCols.length; i++) {
                const cur = statedCols[i];
                if (cur.id === columnId) {
                    actualColumns.push({
                        ...cur,
                        orderNumber,
                        gridId,
                    });
                    continue;
                }
                if (cur.gridId === gridId) {
                    actualColumns.push({
                        ...cur,
                        orderNumber:
                            cur.orderNumber >= orderNumber
                                ? cur.orderNumber + 1
                                : cur.orderNumber,
                    });
                    continue;
                }
                actualColumns.push(cur);
            }
            return { cols: actualColumns };
        });
    },
    pushAndReplaceField: <T extends SettingsFieldsStatic>(
        config: ComponentConfig<T>,
        columnId: string,
        oldColumnId?: string
    ) => {
        const data = {
            ...commonPropsToObjectForm,
            ...getSettingsValues([...config.settings]),
        };

        if (!oldColumnId) {
            data.label = generateLabelName();
        }

        set((state) => {
            const currentFieldInColumn = state.fields.find(
                (el) => el.columnId === columnId
            );
            const newId = new Date().toISOString();

            const newField = {
                ...config,
                columnId,
                id: newId,
                data,
            } as ComponentConfigWithState<SettingsFieldsStatic>;
            const oldItem = state.fields.find(
                (item) => item.columnId === oldColumnId
            );

            if (!currentFieldInColumn) {
                return {
                    fields: oldItem
                        ? state.fields.map((field) =>
                              field.columnId === oldColumnId
                                  ? { ...oldItem, columnId }
                                  : field
                          )
                        : state.fields.concat(newField),
                };
            }
            return {
                fields: oldItem
                    ? state.fields.map((field) =>
                          field.columnId === columnId
                              ? { ...oldItem, columnId }
                              : field.columnId === oldColumnId
                              ? {
                                    ...currentFieldInColumn,
                                    columnId: oldColumnId,
                                }
                              : field
                      )
                    : state.fields.map((field) =>
                          field.columnId === columnId ? newField : field
                      ),
            };
        });
        // set((state) => {
        //     const actualPosition =
        //         pushedOn && rowNumber && positionData?.endPositionId
        //             ? findActualIndexOnFields(
        //                   positionData?.endPositionId,
        //                   pushedOn,
        //                   positionData.oldPositionId
        //               )
        //             : positionData?.oldPositionId
        //             ? state.fields.length
        //             : state.fields.length + 1;

        //     console.log(actualPosition, positionData?.oldPositionId);
        //     const newFieldItem = {
        //         ...config,
        //         position: actualPosition,
        //         rowNumber: rowNumber ?? state.rowNumber + 1,
        //         data,
        //     } as ComponentConfigWithState<SettingsFieldsStatic>;

        //     if (positionData?.oldPositionId !== undefined) {
        //         const { oldPositionId } = positionData;
        //         return {
        //             fields: state.fields.map((el) =>
        //                 el.position === oldPositionId
        //                     ? {
        //                           ...el,
        //                           position: actualPosition,
        //                           rowNumber: rowNumber ?? state.rowNumber + 1,
        //                       }
        //                     : {
        //                           ...el,
        //                           position: mutatePositionNeighbours(
        //                               actualPosition,
        //                               el.position,
        //                               oldPositionId
        //                           ),
        //                       }
        //             ),
        //         };
        //     }

        //     return {
        //         fields: [
        //             ...state.fields.map((el) => ({
        //                 ...el,
        //                 position: mutatePositionNeighbours(
        //                     actualPosition,
        //                     el.position,
        //                     undefined
        //                 ),
        //             })),
        //             newFieldItem,
        //         ],
        //         rowNumber: rowNumber ? state.rowNumber : state.rowNumber + 1, // если засунули в какую-то конкретную строку, то номер последней строки не изменился
        //     };
        // });
    },
    removeField: (columnId: string) => {
        set((state) => {
            const actualFields = state.fields.filter(
                (field) => field.columnId !== columnId
            );
            return { fields: actualFields };

            // const actualFields = state.fields.reduce(
            //     (acc: ComponentConfigWithStateArray, cur) => {
            //         if (cur.position === positionNumber) return acc;
            //         if (cur.position < positionNumber) return acc.concat(cur);
            //         if (cur.position > positionNumber)
            //             return acc.concat({
            //                 ...cur,
            //                 position: cur.position - 1,
            //             });
            //         return acc;
            //     },
            //     []
            // );

            // return { fields: actualFields };
        });
    },
    updateField: <T extends SettingsFieldsStatic>(
        fieldId: string,
        data: Arch<T>
    ) => {
        set((state) => {
            return {
                fields: state.fields.map((field) =>
                    field.id === fieldId ? { ...field, data } : field
                ),
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
