import { useFormConstructor } from "@/app/store/useFormConstructor";
import { useMemo, type FC } from "react";
import FormRow from "../FormRow";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
    grid: IConstructorGrid;
};
const FormGrid: FC<Props> = (props) => {
    const { grid } = props;
    const { cols, activeDraggableItem } = useFormConstructor();

    const parsedColumns = useMemo(() => {
        const parsed = cols.reduce(
            (
                acc: Record<string, IConstructorColumn[]>,
                cur: IConstructorColumn
            ) => {
                if (cur.gridId !== grid.id) return acc;

                const { rowNumber } = cur;
                if (!acc[cur.rowNumber]) {
                    return { ...acc, [rowNumber]: [cur] };
                }
                return { ...acc, [rowNumber]: acc[rowNumber].concat(cur) };
            },
            {} as Record<string, IConstructorColumn[]>
        );
        return Object.entries(parsed).sort((a, b) => +a[0] - +b[0]);
    }, [cols, grid]);

    const { setNodeRef, isOver } = useDroppable({
        id: `grid-${grid.id}`,
        disabled: activeDraggableItem.type !== "col",
        data: {
            item: grid,
        },
    });

    return (
        <div
            className={clsx(styles.container, { [styles.active]: isOver })}
            ref={setNodeRef}
        >
            {parsedColumns.map(([key, columns]) => (
                <FormRow rowIndex={+key} columns={columns} key={key} />
            ))}
        </div>
    );
};

export default FormGrid;
