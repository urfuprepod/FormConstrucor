import {
    formFieldSetting,
    type FormState,
    type FormStateKeys,
} from "@/shared/constants";
import { getSettingsValues } from "@/shared/methods";
import type { FieldType } from "@/shared/types/constructor";
import { checkActualValue } from "@/shared/types/formState";
import { create } from "zustand";

interface IFormState {
    formState: FormState;
    mutate: <K extends FieldType>(key: string, type: K, val: unknown) => void;
    rowNumber: number;
    increaseRowNumber: () => void;
}

export const useFormState = create<IFormState>((set) => ({
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
}));
