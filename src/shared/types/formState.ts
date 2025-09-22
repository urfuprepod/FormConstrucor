import { formFieldSetting, typeMap, type FormStateKeys } from "../constants";
import type { FieldType, GetFieldValueType } from "./constructor";

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
