import { Flex } from "antd";
import type { FC, PropsWithChildren } from "react";
import styles from "./style.module.css";
import clsx from "clsx";

type Props = {
    gap?: number;
    align?: "center" | "start" | "end" | "stratch";
    className?: string;
    style?: React.CSSProperties;
    ref?: (element: HTMLDivElement | null) => void;
    isStretch?: boolean;
};

const FlexInLine: FC<PropsWithChildren<Props>> = (props) => {
    const { gap, align, style, isStretch, ref, children, className } = props;

    return (
        <Flex
            ref={ref}
            className={clsx(className, styles["flex-inline"], {
                [styles.stretch]: isStretch,
            })}
            justify="space-between"
            style={{ ...style }}
            gap={gap}
            align={align ?? "center"}
        >
            {children}
        </Flex>
    );
};

export default FlexInLine;
