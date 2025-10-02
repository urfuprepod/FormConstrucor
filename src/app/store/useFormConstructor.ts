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
import { v4 as uuidv4 } from "uuid";
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
    pushOnRow: (
        direction: DraggableType,
        gridId: string,
        columnId?: string
    ) => void;
    updateCol: (
        colData: Partial<IConstructorColumn>,
        currentColId?: string
    ) => void;
    refreshCol: (columnId: string, targetColumnId?: string) => void;
    updateGrid: (gridData: IConstructorGrid, currentGridId?: string) => void;
    activeGridId: string | null;
    updateActiveGrid: (id?: string) => void;
}

export const useFormConstructor = create<IFormConstructorState>((set, get) => ({
    fields: [],
    rowNumber: 0,
    cols: [],
    activeGridId: null,
    updateActiveGrid: (id) => {
        set((state) => {
            const isNull = id === undefined || id === state.activeGridId;
            return { activeGridId: isNull ? null : id };
        });
    },
    updateCol(colData, currentColId) {
        set((state) => {
            const defaultNewItem = {
                id: uuidv4(),
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
    pushOnRow(direction: DraggableType, gridId: string, columnId?: string) {
        const targetColumn = get().cols.reduce(
            (acc: IConstructorColumn, cur: IConstructorColumn) => {
                switch (direction) {
                    case "startRow":
                        return cur.orderNumber < acc.orderNumber ? cur : acc;

                    case "endRow":
                        return cur.orderNumber > acc.orderNumber ? cur : acc;

                    default:
                        return acc;
                }
            },
            get().cols[0]
        );
        if (direction === "startRow") {
            return get().refreshCol(targetColumn.id, columnId);
        }
        if (!columnId) {
            return set((state) => ({
                cols: state.cols.concat({
                    gridId,
                    orderNumber: targetColumn.orderNumber + 1,
                    id: uuidv4(),
                    sectionWidth: 1,
                    rowNumber: 1,
                }),
            }));
        }
        const currentOrderNumber = get().cols.find(
            (col) => col.id == columnId
        )!.orderNumber;
        set((state) => ({
            cols: state.cols.map((el) =>
                el.id === columnId
                    ? { ...el, orderNumber: targetColumn.orderNumber + 1 }
                    : el.gridId === gridId &&
                      el.orderNumber > currentOrderNumber
                    ? { ...el, orderNumber: el.orderNumber - 1 }
                    : el
            ),
        }));
    },
    refreshCol(targetColumnId, columnId) {
        const statedCols = get().cols;
        const { orderNumber, gridId } = statedCols.find(
            (el) => el.id === targetColumnId
        )!;
        const { gridId: currentGridId, orderNumber: currentOrderNumber } =
            statedCols.find((el) => el.id === columnId)!;
        let actualColumns: IConstructorColumn[] = [];

        const min = Math.min(currentOrderNumber, orderNumber);
        const max = Math.max(currentOrderNumber, orderNumber);

        for (let i = 0; i < statedCols.length; i++) {
            const cur = statedCols[i];
            if (cur.id === columnId) {
                if (gridId === currentGridId) {
                    actualColumns.push({
                        ...cur,
                        orderNumber:
                            currentOrderNumber > orderNumber
                                ? orderNumber
                                : orderNumber - 1,
                        gridId,
                    });
                    continue;
                }
                actualColumns.push({
                    ...cur,
                    orderNumber,
                    gridId,
                });
                continue;
            }
            if (cur.gridId === currentGridId) {
                if (gridId === currentGridId) {
                    if (cur.orderNumber < min || cur.orderNumber >= max) {
                        actualColumns.push(cur);
                        continue;
                    }

                    actualColumns.push({
                        ...cur,
                        orderNumber:
                            currentOrderNumber > orderNumber
                                ? cur.orderNumber + 1
                                : cur.orderNumber - 1,
                    });
                    continue;
                }

                actualColumns.push({
                    ...cur,
                    orderNumber:
                        cur.orderNumber > currentOrderNumber
                            ? cur.orderNumber - 1
                            : cur.orderNumber,
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
        if (!columnId) {
            actualColumns.push({
                gridId,
                orderNumber,
                id: uuidv4(),
                sectionWidth: 1,
                rowNumber: 1,
            });
        }
        set(() => {
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
            const newId = uuidv4();

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
    },
    removeField: (columnId: string) => {
        set((state) => {
            const actualFields = state.fields.filter(
                (field) => field.columnId !== columnId
            );
            return { fields: actualFields };
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
