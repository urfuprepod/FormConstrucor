import { useClickOutside } from "@/shared/hooks";
import { useRef, useState, type RefObject } from "react";

export const useActiveField = (
    ref: RefObject<any>
): [number | null, (positionNumber: number) => void] => {
    const [activePositionNumber, setActivePositionNumber] = useState<
        number | null
    >(null);

    const resetActiveField = () => {
        activePositionNumberRef.current = null;
        setActivePositionNumber(null);
    };

    const activePositionNumberRef = useRef<number | null>(activePositionNumber);

    const updateActiveField = (positionNumber: number) => {
        activePositionNumberRef.current = positionNumber;
        setActivePositionNumber(positionNumber);
    };

    useClickOutside(ref, () => {
        if (activePositionNumberRef.current) {
            resetActiveField();
        }
    });

    return [activePositionNumber, updateActiveField];
};
