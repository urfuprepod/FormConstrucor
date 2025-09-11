import {
    isCheckboxField,
    isInputField,
    isNumberField,
    isSelectField,
} from "@/shared/types/constructor";
import type { EditingSettingsConfig } from "../types";
import {
    EditingCheckbox,
    EditingField,
    EditingInputNumber,
    EditingSelect,
} from "../components/Field";

export const editingFieldsDictionary: EditingSettingsConfig = {
    input: [isInputField, EditingField],
    checkbox: [isCheckboxField, EditingCheckbox],
    number: [isNumberField, EditingInputNumber],
    select: [isSelectField, EditingSelect],
};
