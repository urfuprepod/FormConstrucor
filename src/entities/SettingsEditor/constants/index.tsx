import {
    isCheckboxField,
    isInputField,
    isNumberField,
    isOptionCreatorField,
    isSelectField,
} from "@/shared/types/constructor";
import type { EditingSettingsConfig } from "../types";
import {
    EditingCheckbox,
    EditingField,
    EditingInputNumber,
    EditingSelect,
} from "../components/Field";
import SelectOptionCreator from "../components/Field/EditingOptionCreator";

export const editingFieldsDictionary: EditingSettingsConfig = {
    input: [isInputField, EditingField],
    checkbox: [isCheckboxField, EditingCheckbox],
    number: [isNumberField, EditingInputNumber],
    select: [isSelectField, EditingSelect],
    options: [isOptionCreatorField, SelectOptionCreator]
};
