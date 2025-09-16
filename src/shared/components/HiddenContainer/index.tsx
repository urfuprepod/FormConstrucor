import type { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

type Props = {
    isHidden?: boolean;
    isInvisible?: boolean;
};

const HiddenContainer: FC<PropsWithChildren<Props>> = ({
    isHidden,
    isInvisible,
    children,
}) => {
    return (
        <div
            className={classNames({
                [styles.hidden]: isHidden,
                [styles.invisible]: isInvisible,
            })}
        >
            {children}
        </div>
    );
};

export default HiddenContainer;
