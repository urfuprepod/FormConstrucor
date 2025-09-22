import type { Arch } from "@/shared/types/constructor";
import { Select as BaseSelect } from "antd";
import { type FC } from "react";
import type { SelectSettingsProps } from "./settings";
import { useFormStateContext } from "../../context/formStateContext";

type Props = Arch<SelectSettingsProps>;

const Select: FC<Props> = (props) => {
    const { notFoundContent, loading, name, placeholder, isDisabled, values } =
        props;

    const { updateFormState } = useFormStateContext();

    return (
        <BaseSelect
            id={name}
            notFoundContent={notFoundContent || "Не найдено"}
            disabled={isDisabled}
            loading={loading}
            onChange={updateFormState}
            options={values}
            optionFilterProp="label"
            placeholder={placeholder || "Выберите"}
        />
    );
};

export default Select;
