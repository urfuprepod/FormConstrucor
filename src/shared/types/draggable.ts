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
