import React from "react";
import type { RefObject } from "react";

export const useClickOutside = (ref: RefObject<any>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    React.useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
};
