import { Flex } from "antd";
import {
    EditingItemsSection,
    FieldsListSection,
    OrderContainer,
    PaletteItem,
} from "@/entities/Palette/components";
import React, { useEffect, useRef, useState, type FC } from "react";
import "./styles.css";
import { GAP_VALUE } from "@/shared/constants";
import { fieldsList } from "@/entities/FormConstructor/config";
import type { ComponentConfig } from "@/shared/types/constructor";

type Props = {
    isEditMode: boolean;
};

const ComponentPalette: FC<Props> = React.memo((props) => {
    const { isEditMode } = props;

    const [swapAnimation, setSwapAnimation] = useState<{
        firstId: string;
        secondId: string;
        direction: "up" | "down";
    } | null>(null);

    const [isFirstList, setIsFirstList] = useState<boolean>(true);

    const moveContainer = (id: "editing", direction: "up" | "down") => {
        setSwapAnimation({
            firstId: id,
            secondId: "list",
            direction,
        });
        setIsFirstList((prev) => !prev);
        setTimeout(() => setSwapAnimation(null), 400);
    };

    const getAnimationClass = (containerId: string) => {
        if (!swapAnimation) return "";

        if (containerId === swapAnimation.firstId) {
            return swapAnimation.direction === "up" ? "swap-up" : "swap-down";
        }

        if (containerId === swapAnimation.secondId) {
            return swapAnimation.direction === "up" ? "swap-down" : "swap-up";
        }

        return "";
    };

    const ref = useRef<HTMLDivElement>(null);

    const paletteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && paletteRef.current) {
            paletteRef.current.style.setProperty(
                "--list-height",
                `${ref.current.clientHeight + GAP_VALUE.BIG_VERTICAL}px`
            );
        }
    }, [ref, paletteRef]);

    return (
        <Flex
            vertical
            className="palette-container"
            gap={GAP_VALUE.BIG_VERTICAL}
            ref={paletteRef}
        >
            {!isFirstList && (
                <OrderContainer
                    isFirst
                    onMove={(dir) => moveContainer("editing", dir)}
                    animationClass={getAnimationClass("editing")}
                >
                    <EditingItemsSection isEditingMode={isEditMode} />
                </OrderContainer>
            )}

            <FieldsListSection ref={ref} />

            {isFirstList && (
                <OrderContainer
                    isLast
                    onMove={(dir) => moveContainer("editing", dir)}
                    animationClass={getAnimationClass("editing")}
                >
                    <EditingItemsSection isEditingMode={isEditMode} />
                </OrderContainer>
            )}
        </Flex>
    );
});

export default ComponentPalette;
