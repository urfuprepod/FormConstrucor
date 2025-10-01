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
import { useDraggable, useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

type Props<T extends SettingsFieldsStatic> = {
    buttonsBlock?: React.ReactNode;
    style?: React.CSSProperties;
    form?: FormInstance;
    componentConfiguration: ComponentConfigWithState<T>;
    isPaletteMode?: boolean;
    isDisabled?: boolean;
    activeDraggableId?: string | null;
};

const FieldWithButton = <T extends SettingsFieldsStatic>(props: Props<T>) => {
    const {
        componentConfiguration,
        buttonsBlock,
        form,
        isPaletteMode,
        activeDraggableId,
        isDisabled,
        style,
    } = props;

    const {
        Component,
        data: fieldValues,
        config,
        position: id,
    } = componentConfiguration;

    const value = config.hide?.field
        ? form?.getFieldValue(config.hide.field)
        : null;

    const fieldId = `field-${id}`;

    const identificator = String(isPaletteMode ? `p-${id}` : fieldId);

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

    
    const {
        setNodeRef: setDraggableRef,
        isDragging,
        attributes,
        listeners,
    } = useDraggable({
        id: identificator,
        data: {
            data: componentConfiguration,
        },
    });

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({
        id: fieldId,
        disabled: isDisabled || isPaletteMode,
        data: {
        },
    });

    const ref = (node: HTMLElement | null) => {
        setDraggableRef(node);
        setDroppableRef(node);
    };

    return (
        <Col span={actualColumnLength}>
            <ComponentWithButtons
                className={styles.container}
                style={{ ...style }}
                data-id={identificator}
                data-testid={identificator}
                buttonsBlock={buttonsBlock}
            >
                <div
                    ref={ref}
                    {...attributes}
                    {...listeners}
                    className={clsx(styles["draggable-element"], {
                        [styles.draggable]: isDragging,
                    })}
                >
                    {isOver && fieldId !== activeDraggableId && (
                        <div className={styles["spray"]} />
                    )}

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
