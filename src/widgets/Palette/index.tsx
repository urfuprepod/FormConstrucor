import { Flex } from "antd";
import styles from "./styles.module.css";
import { PaletteItem } from "@/entities/Palette/components";
import React, { type FC } from "react";
import type {
    ComponentConfig,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { fieldsList } from "@/entities/FormConstructor/config";

type PropsFunction = <T extends SettingsFieldsStatic>(
    component: ComponentConfig<T>
) => void;

type Props = {
    onPushField: PropsFunction;
    onUnshiftField: PropsFunction;
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
        </Flex>
    );
});

export default ComponentPalette;
