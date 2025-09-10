import { Flex } from "antd";
import styles from "./styles.module.css";
import { PaletteItem } from "@/entities/Palette/components";
import React, { type FC } from "react";
import type {
    Arch,
    ComponentConfig,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { fieldsList, Input, Select } from "@/entities/FormConstructor/config";
import { selectSettings } from "@/entities/FormConstructor/config/Select/settings";
import { inputSettings } from "@/entities/FormConstructor/config/Input/settings";

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
            {fieldsList.map((cfg, i) => (
                <PaletteItem
                    key={i}
                    config={cfg as ComponentConfig<typeof cfg.settings>}
                    {...props}
                />
            ))}

            {/* <PaletteItem
                config={{ settings: selectSettings, Component: Select }}
                {...props}
            />

            <PaletteItem
                config={{ Component: Select, settings: selectSettings }}
                {...props}
            /> */}
        </Flex>
    );
});

export default ComponentPalette;
