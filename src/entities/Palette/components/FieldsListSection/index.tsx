import { Flex } from "antd";
import PaletteItem from "../PaletteItem";
import { fieldsList } from "@/entities/FormConstructor/config";
import type { ComponentConfig } from "@/shared/types/constructor";
import { useFormConstructor } from "@/app/store/useFormConstructor";
import styles from "./styles.module.css";

const FieldsListSection = () => {
    const { pushAndReplaceField, unshiftNewField } = useFormConstructor();

    return (
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
    );
};

export default FieldsListSection;
