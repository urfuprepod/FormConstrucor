import React, { type FC } from "react";
import { Input as BaseInput, type InputProps } from "antd";
import type { InputOptions } from "@/entities/FormFieldFabric/types";

type Props = InputOptions;

const Input: FC<Props> = (props) => {
    const { placeholder, isDisabled, name } = props;

    return (
        <BaseInput
            id={name}
            type="text"
            disabled={isDisabled}
            placeholder={placeholder ?? "Введите"}
        />
    );
};

export default Input;
