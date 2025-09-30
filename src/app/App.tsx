import "@ant-design/v5-patch-for-react-19";
import { useActiveField } from "../entities/FormConstructor/hooks";
import { Col, ConfigProvider, Row, Spin } from "antd";
import "./main.css";
import { useMemo, useRef, useState } from "react";
import { useFormConstructor } from "./store/useFormConstructor";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDraggableControl } from "@/shared/hooks";
import { OverlayItem } from "@/entities/FormConstructor/components";
import { FormConstructor, SettingsEditor, ComponentPalette } from "@/widgets";

function App() {
    const ref = useRef<HTMLDivElement>(null);

    const [activePositionNumber, setActivePositionNumber] = useActiveField(ref);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const {
        handleDragEnd,
        handleRemoveDraggableId,
        handleDragStart,
        sensors,
        activeDraggableId,
    } = useDraggableControl();

    const { fields } = useFormConstructor();

    const activeField = useMemo(() => {
        let result = undefined;

        if (activePositionNumber !== null) {
            result = fields.find((el) => el.position === activePositionNumber);
        }

        return result;
    }, [fields, activePositionNumber]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Form: {
                        itemMarginBottom: 0,
                    },
                },
            }}
        >
            <Row gutter={16}>
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragCancel={handleRemoveDraggableId}
                    onDragEnd={handleDragEnd}
                >
                    <Col span={6}>
                        <ComponentPalette isEditMode={isEditMode} />
                    </Col>
                    <Col span={12}>
                        {false && <Spin size="large" />}
                        <FormConstructor
                            isDisabled={false}
                            isEditMode={isEditMode}
                            toggleEditMode={setIsEditMode}
                            activePositionNumber={activePositionNumber}
                            onPickFieldActive={setActivePositionNumber}
                            activeDraggableId={activeDraggableId}
                        />
                    </Col>

                    <DragOverlay adjustScale={false} dropAnimation={null}>
                        <OverlayItem />
                    </DragOverlay>
                </DndContext>
                <Col span={6} ref={ref}>
                    {activeField && <SettingsEditor activeItem={activeField} />}
                </Col>
            </Row>
        </ConfigProvider>
    );
}

export default App;
