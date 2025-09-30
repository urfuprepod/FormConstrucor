import { HiddenContainer } from "@/shared/components";
import { GAP_VALUE } from "@/shared/constants";
import { useDraggable } from "@dnd-kit/core";
import { Flex } from "antd";
import { type FC } from "react";

type Props = {
    isEditingMode: boolean;
};

const EditingItems: FC<Props> = (props) => {
    const { isEditingMode } = props;

    const {
        setNodeRef: setGridRef,
        isDragging: isGridDragging,
        attributes: gridAttributes,
        listeners: gridListeners,
    } = useDraggable({
        id: "grid",
    });

    const {
        setNodeRef: setColRef,
        isDragging: isColDragging,
        attributes: colAttributes,
        listeners: colListeners,
    } = useDraggable({
        id: "grid",
    });

    return (
        <HiddenContainer isHidden={!isEditingMode}>
            <Flex vertical gap={GAP_VALUE.BIG_VERTICAL}>
                <div {...gridAttributes} {...gridListeners} ref={setGridRef}>
                    Добавить сетку
                </div>
                <div {...colAttributes} {...colListeners} ref={setColRef}>
                    Добавить колонку
                </div>
            </Flex>
        </HiddenContainer>
    );
};

export default EditingItems;
