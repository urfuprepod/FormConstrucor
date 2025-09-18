import { commonPropsToObjectForm } from "@/entities/FormConstructor/constants";
import { AddButton, FieldWithButton } from "@/shared/components";
import { getSettingsValues } from "@/shared/methods";
import type {
    ComponentConfig,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { MoveUp, Plus } from "lucide-react";

type Props<T extends SettingsFieldsStatic> = {
    config: ComponentConfig<T>;
    onPushField: (field: ComponentConfig<T>) => void;
    onUnshiftField: (field: ComponentConfig<T>) => void;
};

const PaletteItem = <T extends SettingsFieldsStatic = []>(props: Props<T>) => {
    const { config, onPushField, onUnshiftField } = props;

    return (
        <FieldWithButton
            isPaletteMode
            componentConfiguration={{
                ...config,
                rowNumber: 0,
                data: {
                    ...getSettingsValues([...config.settings]),
                    ...commonPropsToObjectForm,
                },
                position: 0,
            }}
            buttonsBlock={
                <>
                    <AddButton
                        onClick={() => onPushField(config)}
                        icon={
                            <Plus size={16} color="#ffffff" strokeWidth={1} />
                        }
                    />
                    <AddButton
                        onClick={() => onUnshiftField(config)}
                        icon={
                            <MoveUp size={16} color="#ffffff" strokeWidth={1} />
                        }
                    />
                </>
            }
        />
    );
};

export default PaletteItem;
