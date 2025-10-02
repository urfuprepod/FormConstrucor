import { Flex } from "antd";
import PaletteItem from "../PaletteItem";
import { fieldsList } from "@/entities/FormConstructor/config";
import type { ComponentConfig } from "@/shared/types/constructor";
import styles from "./styles.module.css";
import type { FC } from "react";

type Props = {
    ref: React.RefObject<HTMLDivElement | null>;
};

const FieldsListSection: FC<Props> = (props) => {
    const { ref } = props;

    // const { pushAndReplaceField, unshiftNewField } = useFormConstructor();

    return (
        <Flex vertical ref={ref} gap={12} className={styles.palette}>
            {fieldsList.map((cfg, i) => (
                <PaletteItem
                    key={i}
                    config={cfg as ComponentConfig<typeof cfg.settings>}
                    orderNumber={i}
                    // onPushField={pushAndReplaceField}
                    // onUnshiftField={unshiftNewField}
                />
            ))}
        </Flex>
    );
};

export default FieldsListSection;
