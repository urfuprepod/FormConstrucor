import { Flex } from "antd";
import type { FC, PropsWithChildren } from "react";
import styles from "./style.module.css";
import classNames from "classnames";

type Props = {
    gap?: number;
    align?: "center" | "start" | "end" | "stratch";
    className?: string;
};

const FlexInLine: FC<PropsWithChildren<Props>> = (props) => {
    const { gap, align, children, className } = props;

    return (
        <Flex
            className={classNames(className, styles["flex-inline"])}
            justify="space-between"
            gap={gap}
            align={align ?? "center"}
        >
            {children}
        </Flex>
    );
};

export default FlexInLine;
