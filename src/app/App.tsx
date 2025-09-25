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
import { DndContext } from "@dnd-kit/core";
import { useDraggableControl } from "@/shared/hooks";

function App() {
    const ref = useRef<HTMLDivElement>(null);

    const [activePositionNumber, setActivePositionNumber] = useActiveField(ref);
    const {
        activeDraggableId,
        handleDragEnd,
        handleRemoveDraggableId,
        handleDragStart,
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
            <DndContext
                onDragStart={handleDragStart}
                onDragCancel={handleRemoveDraggableId}
                onDragEnd={handleDragEnd}
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <ComponentPalette />
                    </Col>
                    <Col span={12}>
                        {isLoadingFields && <Spin size="large" />}
                        <FormConstructor
                            isDisabled={isLoadingFields}
                            activePositionNumber={activePositionNumber}
                            onPickFieldActive={setActivePositionNumber}
                        />
                    </Col>

                    <Col span={6} ref={ref}>
                        {activeField && (
                            <SettingsEditor activeItem={activeField} />
                        )}
                    </Col>
                </Row>
            </DndContext>
        </ConfigProvider>
    );
}

export default App;
