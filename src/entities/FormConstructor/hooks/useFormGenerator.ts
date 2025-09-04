import { useCallback, useState } from "react";
import type { FieldWithPosition, IFormConstructor } from "../types";
import type { Field } from "@/entities/FormFieldFabric/types";

function parseBaseFields(fields: Field[]) {
    return fields.map((el, index) => ({ ...el, position: index }));
}

export const useFormGenerator = (baseFields?: Field[]) => {
    const [data, setData] = useState<IFormConstructor>({
        styles: {},
        fields: baseFields ? parseBaseFields(baseFields) : [],
    });

    const pushNewField = useCallback(
        (field: Field) => {
            setData((prev) => {
                const length = prev.fields.length;
                return {
                    ...prev,
                    fields: prev.fields.concat({ ...field, position: length }),
                };
            });
        },
        [setData]
    );

    // добавляем элемент в начало - увеличиваем порядковый номер у всех остальных полей
    const unshiftNewField = useCallback(
        (field: Field) => {
            setData((prev) => {
                const actual: FieldWithPosition[] = [
                    { ...field, position: 0 },
                    ...prev.fields.map((item) => ({
                        ...item,
                        position: item.position + 1,
                    })),
                ];
                return { ...prev, fields: actual };
            });
        },
        [setData]
    );

    // логика удаления поля: удалять будем по порядковому номеру, другая инфа излишна. Чтобы уместить все в O(n) фильтрацию и мутацию помещаем в reduce, если у элемента порядковый номер был больше удаляемого, то они теперь смещаются на 1 вверх
    const removeField = (positionNumber: number) => {
        setData((prev) => {
            const actualFields = prev.fields.reduce(
                (acc: FieldWithPosition[], cur: FieldWithPosition) => {
                    if (cur.position === positionNumber) return acc;
                    if (cur.position < positionNumber) return acc.concat(cur);
                    if (cur.position > positionNumber)
                        return acc.concat({
                            ...cur,
                            position: cur.position - 1,
                        });
                    return acc;
                },
                []
            );
            return { ...prev, fields: actualFields };
        });
    };

    return { formGenerator: data, pushNewField, removeField, unshiftNewField };
};
