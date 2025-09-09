import { Flex } from "antd";
import styles from "./styles.module.css";
import { PaletteItem } from "@/entities/Palette/components";
import React, { type FC } from "react";
import type { ComponentConfig, SettingsFieldsStatic, } from "@/shared/types";
import { Input, Select } from "@/entities/FormConstructor/config";
import { inputSettings } from "@/entities/FormConstructor/config/Input/settings";
import { selectSettings } from "@/entities/FormConstructor/config/Select/settings";

type Props = {
    onPushField: <T extends SettingsFieldsStatic>(
        component: ComponentConfig<T>
    ) => void;
    onUnshiftField: <T extends SettingsFieldsStatic>(
        component: ComponentConfig<T>
    ) => void;
};

const ComponentPalette: FC<Props> = React.memo((props) => {
    return (
        <Flex vertical gap={12} className={styles.palette}>
            <PaletteItem
                config={{ Component: Input, settings: inputSettings }}
                {...props}
            />

            <PaletteItem
                config={{ Component: Select, settings: selectSettings }}
                {...props}
            />
        </Flex>
    );
});

export default ComponentPalette;
