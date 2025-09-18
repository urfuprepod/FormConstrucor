import { Flex } from "antd";
import React, { type PropsWithChildren } from "react";
import styles from "./style.module.css";

type Props = {
    buttonsBlock?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    ref?: React.RefObject<HTMLDivElement | null>;
};

const ComponentWithButton = (props: PropsWithChildren<Props>) => {
    const { buttonsBlock, className, children, style, ref } = props;
    return (
        <Flex gap={7} align="end" className={className} ref={ref} style={style}>
            <div className={styles.container}>{children}</div>
            {buttonsBlock}
        </Flex>
    );
};

export default ComponentWithButton;
