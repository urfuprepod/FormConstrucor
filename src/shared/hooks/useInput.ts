import { useState } from "react";

export const useInput = (
    startValue?: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, (val: string) => void] => {
    const [data, setData] = useState<string>(startValue ?? "");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.value);
    };

    const setValueProgramly = (val: string) => {
        setData(val)
    }

    return [data, onChange, setValueProgramly];
};
