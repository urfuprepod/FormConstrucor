import { DisabledSpace } from "@/shared/components";
import { GAP_VALUE } from "@/shared/constants";
import { Flex } from "antd";
import { type FC } from "react";
import EditingItem from "./EditingItem";
import styles from "./styles.module.css";

type Props = {
    isEditingMode: boolean;
};

const ids = [
    { id: "col", title: "Добавить колонку" },
    { id: "grid", title: "Добавить сетку" },
];

const EditingItems: FC<Props> = (props) => {
    const { isEditingMode } = props;

    return (
        <div className={styles.container}>
            <DisabledSpace isActive={!isEditingMode} zIndex={30}>
                <Flex vertical gap={GAP_VALUE.GIANT_VERTICAL}>
                    {ids.map(({ id, title }) => (
                        <EditingItem id={id} key={id}>
                            {title}
                        </EditingItem>
                    ))}
                </Flex>
            </DisabledSpace>
        </div>
    );
};

export default EditingItems;
