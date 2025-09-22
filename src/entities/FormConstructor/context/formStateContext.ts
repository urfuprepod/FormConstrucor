import { createContext, useContext } from "react";

interface IFormStateContext {
    updateFormState: (name: string, value: any) => void;
}

export const FormStateContext = createContext<IFormStateContext | undefined>(
    undefined
);

export const useFormStateContext = () => {
    const context = useContext(FormStateContext);
    if (!context) return { updateFormState: () => {} };
    return context;
};
