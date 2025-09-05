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
                    options: { name: "", label: { value: "Input label" } },
                }}
                {...props}
            />

            <PaletteItem
                field={{
                    variant: "select",
                    options: {
                        name: "",
                        label: { value: "Select label" },
                        options: [{ label: "Test", value: "Test" }],
                    },
                }}
                {...props}
            />
        </Flex>
    );
});

export default ComponentPalette;
