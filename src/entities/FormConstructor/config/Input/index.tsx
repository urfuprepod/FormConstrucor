import type { Arch } from "@/shared/types/constructor";
import type { InputSettingsProps } from "./settings";
import { Input as BaseInput } from "antd";
import type { FC } from "react";
import { useFormStateContext } from "../../context/formStateContext";

type Props = Arch<InputSettingsProps>;

const Input: FC<Arch<InputSettingsProps>> = (props: Props) => {
    const { borderWidth, name, isDisabled, placeholder } = props;

    const { updateFormState } = useFormStateContext();

    return (
        <BaseInput
            id={name}
            type="text"
            onChange={(e) => updateFormState(name, e.target.value)}
            style={{ borderWidth }}
            disabled={isDisabled}
            placeholder={placeholder ?? "Введите"}
        />
    );
};

export default Input;
