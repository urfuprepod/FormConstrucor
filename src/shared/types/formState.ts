import { formFieldSetting, type FormStateKeys } from "../constants";
import type {
    FieldType,
    GetFieldValueType,
} from "./constructor";

const typeMap: Record<FieldType, (val: unknown) => boolean> = {
    checkbox: (v) => typeof v === "boolean",
    number: (v) => typeof v === "number",
    options: (v) => Array.isArray(v),
    input: (v) => typeof v === "string",
    select: (v) => typeof v === "string",
};

export const checkActualValue = <T extends FieldType>(
    name: FormStateKeys,
    expectedType: T,
    val: unknown
): val is GetFieldValueType<T> => {
    const actualType = formFieldSetting.find(
        (el) => el.propertyName === name
    )?.type;
    if (!actualType || actualType !== expectedType) return false;

    if (!typeMap[actualType]) {
        return false;
    }

    return typeMap[actualType](val);
};
