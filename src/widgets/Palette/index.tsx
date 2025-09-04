import { Flex } from "antd";
import styles from "./styles.module.css";
import { PaletteItem } from "@/entities/Palette/components";
import type { Field } from "@/entities/FormFieldFabric/types";
import React, { type FC } from "react";

type Props = {
    onPushField: (field: Field) => void;
    onUnshiftField: (field: Field) => void;
};

const ComponentPalette: FC<Props> = React.memo((props) => {
    return (
        <Flex vertical gap={12} className={styles.palette}>
            <PaletteItem
                field={{
                    variant: "input",
                    options: { isDisabled: true, name: "" },
                }}
                {...props}
            />

            <PaletteItem
                field={{
                    variant: "select",
                    options: { isDisabled: true, name: "", options: [{label: 'Test', value: 'Test'}] },
                }}
                {...props}
            />
        </Flex>
    );
});

export default ComponentPalette;
