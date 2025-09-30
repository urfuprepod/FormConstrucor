import { useFormConstructor } from "@/app/store/useFormConstructor";
import { Flex } from "antd";
import React, { useMemo, type FC } from "react";

type Props = {
    grid: IConstructorGrid;
};
const FormGrid: FC<Props> = (props) => {
    const { grid } = props;
    const { cols } = useFormConstructor();

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

    return <Flex vertical>
        
    </Flex>;
};

export default FormGrid;
