import { useFormConstructor } from "@/app/store/useFormConstructor";
import { useMemo, type FC } from "react";
import FormRow from "../FormRow";
import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import styles from "./style.module.css";
import MagnifierButton from "./MagnifierButton";

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
        id: `grid/${grid.id}`,
        disabled:
            activeDraggableItem.type !== "col" || parsedColumns.length > 0,
        data: {
            item: grid,
        },
    });

    return (
        <div
            className={clsx(styles.container, {
                [styles.active]: isOver,
                [styles.first]: grid.colId === null,
            })}
            ref={setNodeRef}
        >
            <MagnifierButton grid={grid} />

            <span className={styles.plus}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5Z"
                        fill="#80daeb"
                    />
                </svg>
            </span>
            {parsedColumns.map(([key, columns]) => (
                <FormRow
                    rowIndex={+key}
                    gridId={grid.id}
                    columns={columns}
                    key={key}
                />
            ))}
        </div>
    );
};

export default FormGrid;
