import "@ant-design/v5-patch-for-react-19";

import { useFormGenerator } from "../entities/FormConstructor/hooks";
import { Col, ConfigProvider, Row } from "antd";
import ComponentPalette from "@/widgets/Palette";
import FormConstructor from "@/widgets/FormConstructor";
import "./main.css";
import SettingsEditor from "@/widgets/SettingsEditor";
import { useState } from "react";

function App() {
    const {
        formGenerator,
        unshiftNewField,
        pushNewField,
        removeField,
        updateField,
    } = useFormGenerator();

    const [activePositionNumber, setActivePositionNumber] = useState<
        number | null
    >(null);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Form: {
                        itemMarginBottom: 0, // Глобально убираем отступы
                    },
                },
            }}
        >
            <Row gutter={16}>
                <Col span={6}>
                    <ComponentPalette
                        onPushField={pushNewField}
                        onUnshiftField={unshiftNewField}
                    />
                </Col>
                <Col span={12}>
                    <FormConstructor
                        formGenerator={formGenerator}
                        onRemoveField={removeField}
                        onPickFieldActive={setActivePositionNumber}
                    />
                </Col>

                <Col span={6}>
                    {activePositionNumber !== null && (
                        <SettingsEditor
                            activeItem={
                                formGenerator.fields[activePositionNumber]
                            }
                            updateField={updateField}
                        />
                    )}
                </Col>
            </Row>
        </ConfigProvider>
    );
}

export default App;
