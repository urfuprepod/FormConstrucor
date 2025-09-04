import "@ant-design/v5-patch-for-react-19";

import { useFormGenerator } from "../entities/FormConstructor/hooks";
import { Col, Row } from "antd";
import ComponentPalette from "@/widgets/Palette";
import FormConstructor from "@/widgets/FormConstructor";

function App() {
    const { formGenerator, unshiftNewField, pushNewField, removeField } =
        useFormGenerator();

    return (
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
                />
            </Col>
        </Row>
    );
}

export default App;
