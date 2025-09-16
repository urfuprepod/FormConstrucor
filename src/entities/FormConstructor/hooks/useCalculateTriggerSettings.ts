import type {
    Arch,
    DependedValue,
    FieldType,
    GetFieldValueType,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { useEffect, useMemo, useRef } from "react";

export const useCalculatetriggerSettings = <T extends FieldType>(
    val: GetFieldValueType<T>,
    data: Arch<SettingsFieldsStatic>,
    updateSettings: (val: GetFieldValueType<T>) => void,
    dependecies?: DependedValue<T>[]
) => {
    const subscribedValues = useMemo(() => {
        if (!dependecies) return {};
        const dependeciesKeys = dependecies.map((el) => el.propertyName);
        const obj: Record<string, GetFieldValueType<FieldType>> = {};

        dependeciesKeys.forEach((key) => {
            obj[key] = data[key];
        });

        return obj;
    }, [
        dependecies,
        ...(dependecies ?? []).map((key) => data[key.propertyName]),
    ]);

    const snapshotRef =
        useRef<Record<string, GetFieldValueType<FieldType> | undefined>>(
            subscribedValues
        );

    useEffect(() => {
        if (snapshotRef.current && dependecies) {
            for (const key in snapshotRef.current) {
                const actualDependecy = dependecies.find(
                    (item) => item.propertyName === key
                );

                if (!actualDependecy) return;

                if (snapshotRef.current[key] !== subscribedValues[key]) {
                    snapshotRef.current[key] = subscribedValues[key];
                    if (
                        subscribedValues[key] === actualDependecy.triggeredValue
                    ) {
                        updateSettings(
                            actualDependecy.callback(val, subscribedValues[key])
                        );
                    }
                }
            }
        }
    }, [subscribedValues]);
};
