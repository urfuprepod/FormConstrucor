import type { IOption } from "@/shared/types/selelct";

declare global {
    interface Number {
        toArrayOption(includeOnce?: boolean): IOption[];
    }
}

if (!Number.prototype.toArrayOption) {
    Number.prototype.toArrayOption = function (
        includeOnce?: boolean
    ): IOption[] {
        const result: IOption[] = [];

        const value = this as number

        for (let i = 1; i <= value; i++) {
            if (!includeOnce && i === 1) continue;
            if (value % i !== 0) continue;
            result.push({ value: String(i), label: String(i) });
        }

        return result;
    };
}

export {};
