import {
    formFieldSetting,
    type FormState,
    type FormStateKeys,
} from "@/shared/constants";
import { getSettingsValues } from "@/shared/methods";
import type {
    ComponentConfig,
    ComponentConfigWithStateArray,
    FieldType,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { checkActualValue } from "@/shared/types/formState";
import { create } from "zustand";

interface IFormConstructorState {
    fields: ComponentConfigWithStateArray;
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => void;
    formState: FormState;
    mutate: <K extends FieldType>(key: string, type: K, val: unknown) => void;

    rowNumber: number;
    increaseRowNumber: () => void;
}

export const useFormConstructor = create<IFormConstructorState>((set) => ({
    fields: [],
    formState: getSettingsValues(formFieldSetting),
    rowNumber: 0,
    increaseRowNumber() {
        set((state) => ({ rowNumber: state.rowNumber + 1 }));
    },
    mutate: (key, type, value) => {
        set((state) => {
            const keyState = key as FormStateKeys;
            if (checkActualValue(keyState, type, value)) {
                return { formState: { ...state.formState, [keyState]: value } };
            }
            return {};
        });
    },
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => {
        set((state) => ({
            fields: state.fields.map((field) =>
                field.position === positionNumber
                    ? { ...field, config: { ...field.config, [key]: val } }
                    : field
            ),
        }));
    },
}));
