import React, { type FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { Typography } from "antd";
import { useFormConstructor } from "@/app/store/useFormConstructor";

type Props = {
    isLastRowEmpty: boolean;
};

const RowCreationBlock: FC<Props> = (props) => {
    // const { updateFieldLayout, pushNewField } = useFormConstructor();

    const { isLastRowEmpty } = props;

    const onAddNewRow = () => {
        if (!isLastRowEmpty) {
            // pushNewField()
        }
    };

    return (
        <div className={clsx(styles.container, { [styles.active]: false })}>
            <div className={styles["row-block"]}>
                <Typography.Title level={5}>
                    Добавить строку{" "}
                    {isLastRowEmpty && "(последняя строка и так пустая)"}
                </Typography.Title>
            </div>
        </div>
    );
};

export default RowCreationBlock;
