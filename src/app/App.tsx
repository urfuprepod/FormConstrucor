import "@ant-design/v5-patch-for-react-19";
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

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const {
        handleDragEnd,
        handleRemoveDraggableItem,
        handleDragStart,
        sensors,
    } = useDraggableControl();

    const { fields, activeFieldId } = useFormConstructor();

    const activeField = useMemo(() => {
        let result = undefined;

        if (activeFieldId !== null) {
            result = fields.find((el) => el.id === activeFieldId);
        }

        return result;
    }, [fields, activeFieldId]);

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
                    onDragCancel={handleRemoveDraggableItem}
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
