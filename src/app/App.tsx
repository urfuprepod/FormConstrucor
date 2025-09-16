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
import { useRef } from "react";
import { getFormConfig } from "@/shared/api/fakeApi";
import { FormConstructorContext } from "@/entities/FormConstructor/context";

function App() {
    const ref = useRef<HTMLDivElement>(null);

    const [activePositionNumber, setActivePositionNumber] = useActiveField(ref);

    const {
        fields,
        pushNewField,
        unshiftNewField,
        updateField,
        activeField,
        removeField,
        isLoadingFields,
        updateConfig,
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
            <FormConstructorContext.Provider value={{ fields, updateConfig }}>
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
                            activePositionNumber={activePositionNumber}
                            onRemoveField={removeField}
                            onPickFieldActive={setActivePositionNumber}
                        />
                    </Col>

                    <Col span={6} ref={ref}>
                        {activeField && (
                            <SettingsEditor
                                updateField={updateField}
                                activeItem={activeField}
                            />
                        )}
                    </Col>
                </Row>
            </FormConstructorContext.Provider>
        </ConfigProvider>
    );
}

export default App;
