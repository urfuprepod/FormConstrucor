import type { BaseButtonProps } from "antd/es/button/button";
import React, { type FC } from "react";
import { Button as BaseButton,} from "antd";
import { partialProps } from "@/shared/methods";
import style from './styles.module.css'

const Button: FC<
    BaseButtonProps & {
        fontSize?: number;
        primaryColor?: string;
        onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        icon?: React.ReactNode;
    }
> = (props) => {
    const { primaryColor = "#52c41a", icon, children, styles, ...rest } = props;
    return (
        <BaseButton
            type="text"
            shape="circle"
            className={style.button}
            style={{ ...styles, backgroundColor: primaryColor }}
            icon={icon}
            {...rest}
        >
            {children}
        </BaseButton>
    );
};

export default Button;

export const AddButton = partialProps(Button, {
    primaryColor: "#52c41a",
});

export const DeleteButton = partialProps(Button, {
    primaryColor: "#e22739",
});
