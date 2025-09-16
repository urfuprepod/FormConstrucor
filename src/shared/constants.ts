import type { IOption } from "./types/selelct";

export const fieldVariantsOptions = [
    { label: "Поле пустое/0/false", value: "empty" },
    { label: "Поле имеет значение", value: "full" },
    { label: "Поле равняется", value: "equal" },
] as const satisfies IOption[];
