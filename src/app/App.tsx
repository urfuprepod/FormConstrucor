import "@ant-design/v5-patch-for-react-19";
import {
    useActiveField,
    useComponentConfig,
} from "../entities/FormConstructor/hooks";
import { Col, ConfigProvider, Row, Spin } from "antd";
import ComponentPalette from "@/widgets/Palette";
import FormConstructor from "@/widgets/FormConstructor";
import "./main.css";
import SettingsEditor from "@/widgets/SettingsEditor";
import { useMemo, useRef } from "react";
import { useFormConstructor } from "./store/useFormConstructor";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDraggableControl } from "@/shared/hooks";
import { OverlayItem } from "@/entities/FormConstructor/components";

function App() {
    const ref = useRef<HTMLDivElement>(null);

    const [activePositionNumber, setActivePositionNumber] = useActiveField(ref);
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

    const { isLoadingFields } = useComponentConfig(activePositionNumber);

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
                        <ComponentPalette />
                    </Col>
                    <Col span={12}>
                        {isLoadingFields && <Spin size="large" />}
                        <FormConstructor
                            isDisabled={isLoadingFields}
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
