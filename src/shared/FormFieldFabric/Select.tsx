import React, { type FC } from "react";
import { Select as BaseSelect } from "antd";
import type { SelectOptions } from "@/entities/FormFieldFabric/types";

type Props = SelectOptions;

const Select: FC<Props> = (props) => {
    const { options, placeholder, notFoundContent, name, isDisabled } = props;

    return (
        <BaseSelect
            options={options}
            id={name}
            disabled={isDisabled}
            placeholder={placeholder ?? "Выберите"}
            notFoundContent={notFoundContent ?? "Не найдено"}
        />
    );
};

export default Select;
