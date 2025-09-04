import type { Field } from "@/entities/FormFieldFabric/types";
import { AddButton, FieldWithButton } from "@/shared/components";
import { MoveUp, Plus } from "lucide-react";
import { type FC } from "react";

type Props = {
    field: Field;
    onPushField: (field: Field) => void;
    onUnshiftField: (field: Field) => void;
};

const PaletteItem: FC<Props> = (props) => {
    const { field, onPushField, onUnshiftField } = props;

    return (
        <FieldWithButton
            field={field}
            buttonsBlock={
                <>
                    <AddButton
                        onClick={() => onPushField(field)}
                        icon={
                            <Plus size={16} color="#ffffff" strokeWidth={1} />
                        }
                    />
                    <AddButton
                        onClick={() => onUnshiftField(field)}
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
