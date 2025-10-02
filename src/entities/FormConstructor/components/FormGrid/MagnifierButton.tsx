import { useFormConstructor } from "@/app/store/useFormConstructor";
import React, { type FC } from "react";
import styles from './style.module.css'
import { SearchCheck, SearchX } from "lucide-react";

type Props = {
    grid: IConstructorGrid
};

const MagnifierButton: FC<Props> = (props) => {
    const { grid } = props;
    const { activeGridId, updateActiveGrid } = useFormConstructor();

    if (!grid.colId) return null
    return (
        <button
            className={styles.loop}
            onClick={() => updateActiveGrid(grid.id)}
        >
            {activeGridId === grid.id ? (
                <SearchX size={16} color="red" />
            ) : (
                <SearchCheck size={16} color="green" />
            )}
        </button>
    );
};

export default MagnifierButton;
