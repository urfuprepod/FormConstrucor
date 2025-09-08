import type { Ahue } from "@/shared/types";
import { Select as BaseSelect } from "antd";
import { type FC } from "react";
import type { SelectSettingsProps } from "./settings";

type Props = Ahue<SelectSettingsProps>;

const Select: FC<Props> = (props) => {
    const { notFoundContent, name, placeholder, isDisabled } = props;

    return (
        <BaseSelect
            id={name}
            notFoundContent={notFoundContent || "Не найдено"}
            disabled={isDisabled}
            optionFilterProp="label"
            placeholder={placeholder || 'Выберите'}
        />
    );
};

export default Select;
