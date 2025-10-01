import {
    type FC,
    type PropsWithChildren,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Spin } from "antd";

type Props = {
    isActive: boolean;
    zIndex?: number;
    className?: string;
    customize?: boolean;
};

const DisabledSpace: FC<PropsWithChildren<Props>> = (props) => {
    const { children, isActive, zIndex, className, customize } = props;
    const [counter, setCounter] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setCounter((prev) => prev + 1);
            }, 5000);
        }

        if (!isActive) {
            setCounter(0);
            if (timerRef?.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [isActive]);

    const zIndexValue = zIndex ?? "auto";
    const isLoadingSeen = isActive && customize;

    return (
        <div className={classNames(styles["container-space"], className)}>
            <div
                className={classNames(styles["container-space-blocked"], {
                    [styles.active]: isActive,
                })}
                style={{ zIndex: zIndexValue }}
            />
            {isLoadingSeen && (
                <div className={styles["disabled-attentions"]}>
                    <Spin size="large" spinning />
                </div>
            )}
            {children}
        </div>
    );
};

export default DisabledSpace;
