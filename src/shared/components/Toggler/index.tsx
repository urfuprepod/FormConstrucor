import React, { useId, type FC, type PropsWithChildren } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Flex } from "antd";
import { GAP_VALUE } from "@/shared/constants";

type Props = {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    disabled?: boolean;
};

const Toggler: FC<PropsWithChildren<Props>> = (props) => {
    const { className, children, ...rest } = props;

    const id = useId();

    return (
        <Flex gap={GAP_VALUE.MIN_HORIZONTAL} align="center">
            {children && <label htmlFor={id}>{children}</label>}
            <input
                id={id}
                className={classNames(className, styles.toggle)}
                type="checkbox"
                {...rest}
            />
        </Flex>
    );
};

export default Toggler;
