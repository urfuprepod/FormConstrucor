export type DraggableVariant = "create";
export type DraggableType = "startRow" | "endRow";

export type DraggableItemVariant = "field" | "grid" | "col";

export type DraggableItem = {
    type: null | DraggableItemVariant;
    id: null | string;
};

export const isDraggableItem = (val: unknown): val is DraggableItemVariant => {
    return typeof val === "string" && ["field", "grid", "col"].includes(val);
};

const columnKeys: (keyof IConstructorColumn)[] = [
    "orderNumber",
    "gridId",
    "rowNumber",
    "sectionWidth",
    "id",
];
export const isValidToUpdateCol = (
    val: unknown
): val is Partial<IConstructorColumn> => {
    if (typeof val !== "object" || Array.isArray(val) || !val) return false;
    return Object.keys(val).every((key) =>
        columnKeys.includes(key as keyof IConstructorColumn)
    );
};
