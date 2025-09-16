import { useEffect, useRef, useState } from "react";

export const useDebounce = (
    startValue?: string,
    callback?: (val: string) => void,
    delay: number = 500
) => {
    const [data, setData] = useState(startValue ?? "");
    const [debouncedValue, setDebouncedValue] = useState(data);

    const timerRef = useRef<number | null>(null);

    function onChangeString(val: string) {
        setData(val);
    }

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (!data) {
            setDebouncedValue("");
        } else {
            timerRef.current = setTimeout(() => {
                setDebouncedValue(data ?? "");
                callback?.(data ?? "");
            }, delay);
        }
    }, [data]);

    useEffect(() => {
        if (startValue !== data) {
            setData(startValue ?? '');
        }
    }, [startValue]);

    return {
        value: data,
        debouncedValue,
        setValue: onChangeString,
        mutateDebouncedValue: setDebouncedValue,
    };
};
