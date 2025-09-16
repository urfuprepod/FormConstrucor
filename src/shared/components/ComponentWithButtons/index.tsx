import { Flex } from "antd";
import React, { type PropsWithChildren } from "react";

type Props = {
    buttonsBlock?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string
    ref?: React.RefObject<HTMLDivElement | null>
};

const CompnentWithButton = (props: PropsWithChildren<Props>) => {
    const { buttonsBlock, className, children, style, ref } = props;
    return (
        <Flex gap={7} align="end" className={className} ref={ref} style={style}>
            {children}
            {buttonsBlock}
        </Flex>
    );
};

export default CompnentWithButton;
