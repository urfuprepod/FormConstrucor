import React, { type FC, type PropsWithChildren } from "react";
import styles from "./style.module.css";
import clsx from "clsx";

type Props = {
    isLast?: boolean;
    isFirst?: boolean;
    animationClass: string;
    onMove: (direction: 'up' | 'down') => void
};

const OrderContainer: FC<PropsWithChildren<Props>> = (props) => {
    const { isFirst, isLast, animationClass, onMove, children } = props;

    return (
        <div className={clsx(styles["container-item"], animationClass)}>
            {children}
            <div className={styles["container-actions"]}>
                <button
                    className={clsx(styles["arrow-btn"], styles["up-btn"])}
                    onClick={() => onMove('up')}
                    aria-label="Переместить вверх"
                    disabled={isFirst}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                    </svg>
                </button>

                <button
                    className={clsx(styles["arrow-btn"], styles["down-btn"])}
                    onClick={() => onMove('down')}
                    aria-label="Переместить вниз"
                    disabled={isLast}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default OrderContainer;
