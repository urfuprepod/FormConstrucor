import { type FC } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { ComponentWithLabel, SettingField } from "@/shared/components";
import { formFieldSetting } from "@/shared/constants";
import { useFormConstructor } from "@/app/store/useFormConstructor";

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
                    <SettingField
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
