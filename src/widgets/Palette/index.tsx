import { Flex } from "antd";
import styles from "./styles.module.css";
import { EditingItemsSection, PaletteItem } from "@/entities/Palette/components";
import React, { type FC } from "react";
import type { ComponentConfig } from "@/shared/types/constructor";
import { fieldsList } from "@/entities/FormConstructor/config";
import { useFormConstructor } from "@/app/store/useFormConstructor";

type Props = {
    isEditMode: boolean
}

const ComponentPalette: FC<Props> = React.memo((props) => {
    const { pushAndReplaceField, unshiftNewField } = useFormConstructor();
    const {isEditMode} = props

    return (
        <Flex vertical>
            <Flex vertical gap={12} className={styles.palette}>
                {fieldsList.map((cfg, i) => (
                    <PaletteItem
                        key={i}
                        config={cfg as ComponentConfig<typeof cfg.settings>}
                        orderNumber={i}
                        onPushField={pushAndReplaceField}
                        onUnshiftField={unshiftNewField}
                    />
                ))}
            </Flex>

            <EditingItemsSection isEditingMode={isEditMode} />
        </Flex>
    );
});

export default ComponentPalette;
