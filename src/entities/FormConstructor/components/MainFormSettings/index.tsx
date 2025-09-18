import { useFormConstructor } from "@/app/store/useFormConstructor";
import { editingFieldsDictionary } from "@/entities/SettingsEditor/constants";
import type { FieldProps } from "@/shared/types/constructor";
import { type FC } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { ComponentWithLabel } from "@/shared/components";
import { formFieldSetting } from "@/shared/constants";

type Props = {
    isActive: boolean;
};

const MainFormSettings: FC<Props> = (props) => {
    const { isActive } = props;

    const { formState, mutate } = useFormConstructor();

    return (
        <div className={clsx(styles.container, { [styles.active]: isActive })}>
            {formFieldSetting.map((el) => (
                <ComponentWithLabel
                    labelValue={el.labelText}
                    fieldName={el.propertyName}
                    key={el.propertyName}
                >
                    <Field
                        value={formState[el.propertyName]}
                        field={el}
                        onChange={(val) => {
                            mutate(el.propertyName, el.type, val);
                        }}
                    />
                </ComponentWithLabel>
            ))}
        </div>
    );
};

export default MainFormSettings;

const Field: FC<{
    field: FieldProps;
    value: any;
    onChange: (val: any) => void;
}> = (props) => {
    const { field, value, onChange } = props;

    const { propertyName, placeholder } = field;

    const [guardFn, Component] = editingFieldsDictionary[field.type];

    if (guardFn(field))
        return (
            <>
                <Component
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    propertyName={propertyName}
                    {...field.options}
                />
            </>
        );

    return null;
};
