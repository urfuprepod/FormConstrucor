import type { Ahue } from "@/shared/types";
import type { InputSettingsProps } from "./settings";
import { Input as BaseInput } from "antd";

type Props = Ahue<InputSettingsProps>;

const Input = (props: Props) => {
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
