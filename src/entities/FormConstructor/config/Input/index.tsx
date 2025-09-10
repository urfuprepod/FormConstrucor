import type { Arch } from "@/shared/types/constructor";
import type { InputSettingsProps } from "./settings";
import { Input as BaseInput } from "antd";
import type { FC } from "react";

type Props = Arch<InputSettingsProps>;

const Input: FC<Arch<InputSettingsProps>>= (props: Props) => {
    const {borderWidth, name, isDisabled, placeholder } = props;

    return (
        <BaseInput
            id={name}
            type="text"
            style={{ borderWidth }}
            disabled={isDisabled}
            placeholder={placeholder ?? "Введите"}
        />
    );
};

export default Input;
