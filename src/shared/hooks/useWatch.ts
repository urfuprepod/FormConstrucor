import { useEffect, useRef } from "react";

export const useWatch = <T>(
    value?: T,
    callback?: (val?: T, oldValue?: T) => void
) => {
    const previousValue = useRef<T | undefined>(value);

    useEffect(() => {
        const oldValue = previousValue.current;
        if (oldValue !== value) {
            callback?.(value, oldValue);
            previousValue.current = value;
        }
    }, [value, callback]);
};
