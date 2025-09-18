import type { Arch } from "@/shared/types/constructor";
import { Select as BaseSelect } from "antd";
import { type FC } from "react";
import type { SelectSettingsProps } from "./settings";

type Props = Arch<SelectSettingsProps>;

const Select: FC<Props> = (props) => {
    const {
        notFoundContent,
        loading,
        name,
        placeholder,
        isDisabled,
        values,
        onChange,
    } = props;

    return (
        <BaseSelect
            id={name}
            notFoundContent={notFoundContent || "Не найдено"}
            disabled={isDisabled}
            loading={loading}
            onChange={onChange}
            options={values}
            optionFilterProp="label"
            placeholder={placeholder || "Выберите"}
        />
    );
};

export default Select;
