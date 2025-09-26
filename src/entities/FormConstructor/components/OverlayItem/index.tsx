import React, { type FC, type PropsWithChildren } from "react";
import styles from "./style.module.css";

const DragOverlay: FC<PropsWithChildren> = (props) => {
    const { children } = props;

    return <div className={styles.overlay}>Элемент {children}</div>;
};

export default DragOverlay;
