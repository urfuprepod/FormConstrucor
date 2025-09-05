import type { Field } from "@/entities/FormFieldFabric/types";
import FormFieldFabric from "@/widgets/FormFieldFabric";
import { Flex } from "antd";
import React, { type FC } from "react";

type Props = {
    field: Field;
    buttonsBlock?: React.ReactNode;
};

const FieldWithButton: FC<Props> = (props) => {
    const { field, buttonsBlock } = props;

    return (
        <Flex gap={7} align="end">
            <FormFieldFabric {...field} />
            {buttonsBlock}
        </Flex>
    );
};

export default FieldWithButton;
