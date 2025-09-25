import React, { useEffect, useState, type FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { Typography } from "antd";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    isLastRowEmpty: boolean;
};

const RowCreationBlock: FC<Props> = (props) => {
    const { isLastRowEmpty } = props;

    const { isOver, setNodeRef } = useDroppable({
        id: "create",
    });

    const [isShowed, setIsShowed] = useState<boolean>(false);

    useEffect(() => {
        setIsShowed(!!isOver);
    }, [isOver]);

    return (
        <div
            ref={setNodeRef}
            className={clsx(styles.container, {
                [styles.active]: isShowed,
            })}
        >
            <div
                className={clsx(styles["row-block"], {
                    [styles.disabled]: isLastRowEmpty,
                })}
            >
                <Typography.Title level={5}>
                    Добавить строку{" "}
                    {isLastRowEmpty && "(не имеет смысла)"}
                </Typography.Title>
            </div>
        </div>
    );
};

export default RowCreationBlock;
