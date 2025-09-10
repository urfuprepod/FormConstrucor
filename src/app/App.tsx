import "@ant-design/v5-patch-for-react-19";
import { useComponentConfig } from "../entities/FormConstructor/hooks";
import { Col, ConfigProvider, Flex, Row, Space, Spin } from "antd";
import ComponentPalette from "@/widgets/Palette";
import FormConstructor from "@/widgets/FormConstructor";
import "./main.css";
import SettingsEditor from "@/widgets/SettingsEditor";
import { useState } from "react";
import { getFormConfig } from "@/shared/api/fakeApi";

function App() {
    const [activePositionNumber, setActivePositionNumber] = useState<
        number | null
    >(null);

    const {
        fields,
        pushNewField,
        unshiftNewField,
        updateField,
        activeField,
        removeField,
        isLoadingFields,
    } = useComponentConfig(activePositionNumber, getFormConfig);

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
                <Col span={6}>
                    <ComponentPalette
                        onPushField={pushNewField}
                        onUnshiftField={unshiftNewField}
                    />
                </Col>
                <Col span={12}>
                    {isLoadingFields && <Spin size="large" />}
                    <FormConstructor
                        formComponentsState={fields}
                        isDisabled={isLoadingFields}
                        onRemoveField={removeField}
                        onPickFieldActive={setActivePositionNumber}
                    />
                </Col>

                <Col span={6}>
                    {activeField && (
                        <SettingsEditor
                            updateField={updateField}
                            activeItem={activeField}
                        />
                    )}
                </Col>
            </Row>
        </ConfigProvider>
    );
}

export default App;
