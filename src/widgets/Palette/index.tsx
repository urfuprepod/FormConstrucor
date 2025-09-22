import { Flex } from "antd";
import styles from "./styles.module.css";
import { PaletteItem } from "@/entities/Palette/components";
import React, { type FC } from "react";
import type { ComponentConfig } from "@/shared/types/constructor";
import { fieldsList } from "@/entities/FormConstructor/config";
import { useFormConstructor } from "@/app/store/useFormConstructor";

const ComponentPalette: FC = React.memo(() => {
    const { pushNewField, unshiftNewField } = useFormConstructor();

    return (
        <Flex vertical gap={12} className={styles.palette}>
            {fieldsList.map((cfg, i) => (
                <PaletteItem
                    key={i}
                    config={cfg as ComponentConfig<typeof cfg.settings>}
                    onPushField={pushNewField}
                    onUnshiftField={unshiftNewField}
                />
            ))}
        </Flex>
    );
});

export default ComponentPalette;
