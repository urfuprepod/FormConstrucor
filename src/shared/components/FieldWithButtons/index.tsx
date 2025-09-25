import FormFieldFabric from "@/shared/FormFieldFabric";
import type {
    SettingsFieldsStatic,
    ComponentConfigWithState,
} from "@/shared/types/constructor";
import React, { useMemo } from "react";
import ComponentWithButtons from "../ComponentWithButtons";
import styles from "./style.module.css";
import { Col, type FormInstance } from "antd";
import HiddenContainer from "../HiddenContainer";
import { MAX_COLUMNS } from "@/shared/constants";
import { useFormConstructor } from "@/app/store/useFormConstructor";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";

type Props<T extends SettingsFieldsStatic> = {
    buttonsBlock?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: (e: PointerEvent) => void;
    form?: FormInstance;
    componentConfiguration: ComponentConfigWithState<T>;
    isPaletteMode?: boolean;
};

const FieldWithButton = <T extends SettingsFieldsStatic>(props: Props<T>) => {
    const { componentConfiguration, buttonsBlock, form, isPaletteMode, style } =
        props;

    const {
        Component,
        data: fieldValues,
        config,
        position: id,
    } = componentConfiguration;

    const value = config.hide?.field
        ? form?.getFieldValue(config.hide.field)
        : null;

    const isHidden = useMemo(() => {
        if (!config.hide) return false;

        const { type, value: hideValue } = config.hide;

        return (
            {
                full: !!value,
                empty: !value,
                equal: hideValue === value,
            }[type] ?? false
        );
    }, [value, form, config]);

    const { formState } = useFormConstructor();

    const actualColumnLength = useMemo(() => {
        if (
            fieldValues.columnsLength === 0 ||
            !formState.columnLength ||
            isPaletteMode
        )
            return 24;
        return (
            fieldValues.columnsLength * (MAX_COLUMNS / +formState.columnLength)
        );
    }, [formState.columnLength, fieldValues.columnsLength, isPaletteMode]);

    const { setNodeRef, isDragging, attributes, listeners, transform } =
        useDraggable({
            id: String(isPaletteMode ? `p-${id}` : id),
            data: {
                data: componentConfiguration,
            },
        });

    const draggableStyle = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Col span={actualColumnLength}>
            <ComponentWithButtons
                className={styles.container}
                style={{ ...style, ...draggableStyle }}
                buttonsBlock={buttonsBlock}
            >
                <div
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    style={{ padding: "5 5 0 5" }}
                    className={clsx({
                        [styles.draggable]: isDragging,
                    })}
                >
                    <HiddenContainer isHidden={isHidden}>
                        <FormFieldFabric
                            Component={Component}
                            fieldValues={fieldValues}
                        />
                    </HiddenContainer>
                </div>
            </ComponentWithButtons>
        </Col>
    );
};

export default FieldWithButton;
