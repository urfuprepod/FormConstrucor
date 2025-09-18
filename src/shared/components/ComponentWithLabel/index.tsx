import { Flex } from "antd";
import { type FC, type PropsWithChildren } from "react";
import styles from './styles.module.css'

type Props = {
    fieldName: string;
    labelValue: string;
    gap?: number;
};

const ComponentWithLabel: FC<PropsWithChildren<Props>> = (props) => {
    const { children, fieldName, gap, labelValue } = props;

    return (
        <Flex vertical gap={gap ?? 6}>
            <label className={styles.label} htmlFor={fieldName}>{labelValue}</label>

            {children}
        </Flex>
    );
};

export default ComponentWithLabel;
