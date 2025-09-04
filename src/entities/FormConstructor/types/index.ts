import type { Field } from "../../FormFieldFabric/types";

// каждое поле в форме будет иметь номер позиционирования: это будет отдельно и уникальным модификатором, и поможет в будущем при реализации днд
export type FieldWithPosition = Field & { position: number }

export interface IFormConstructor {
    styles: {};
    fields: FieldWithPosition[];
}
