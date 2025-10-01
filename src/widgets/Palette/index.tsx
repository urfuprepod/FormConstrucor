import { Flex } from "antd";
import {
    EditingItemsSection,
    FieldsListSection,
    OrderContainer,
} from "@/entities/Palette/components";
import React, { type FC } from "react";

type Props = {
    isEditMode: boolean;
};

const ComponentPalette: FC<Props> = React.memo((props) => {
    const { isEditMode } = props;

    return (
        <Flex vertical>
            <OrderContainer>
                <FieldsListSection />
            </OrderContainer>

            <OrderContainer>
                <EditingItemsSection isEditingMode={isEditMode} />
            </OrderContainer>
        </Flex>
    );
});

export default ComponentPalette;
