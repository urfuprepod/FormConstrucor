import { useState } from "react";

export const useInput = (
    startValue?: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
    const [data, setData] = useState<string>(startValue ?? "");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(e.target.value);
    };

    return [data, onChange];
};
