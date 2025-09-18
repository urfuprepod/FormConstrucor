import type {
    ComponentConfig,
    ComponentConfigWithStateArray,
    SettingsFieldsStatic,
} from "@/shared/types/constructor";
import { createContext, useContext } from "react";

interface IFormConstructorContext {
    fields: ComponentConfigWithStateArray;
    updateConfig: <
        T extends keyof ComponentConfig<SettingsFieldsStatic>["config"]
    >(
        positionNumber: number,
        key: T,
        val: ComponentConfig<SettingsFieldsStatic>["config"][T]
    ) => void;
}

export const FormConstructorContext = createContext<
    IFormConstructorContext | undefined
>(undefined);

export const useFormConstructorContext = () => {
    const context = useContext(FormConstructorContext);
    if (!context) throw new Error("context error");
    return context;
};
