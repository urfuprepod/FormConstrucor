import { Button, Flex } from "antd";
import { useState, type FC } from "react";
import MainFormSettings from "../MainFormSettings";
import { Toggler } from "@/shared/components";
import { GAP_VALUE } from "@/shared/constants";

type Props = {
    isEditMode: boolean;
    toggleEditMode: (val: boolean) => void;
};

const ModeConstructorBlock: FC<Props> = (props) => {
    const [isActiveSettings, setIsActiveSettings] = useState<boolean>(false);

    const { isEditMode, toggleEditMode } = props;

    return (
        <>
            <Flex justify="space-between" gap={GAP_VALUE.BIG_HORIZONTAL}>
                <Button
                    color="primary"
                    variant={isActiveSettings ? "outlined" : "solid"}
                    onClick={() => setIsActiveSettings((prev) => !prev)}
                >
                    Настройки формы
                </Button>

                <Toggler
                    checked={isEditMode}
                    onChange={(e) => toggleEditMode(e.target.checked)}
                >
                    Режим редактирования
                </Toggler>
            </Flex>

            <MainFormSettings isActive={isActiveSettings} />
        </>
    );
};

export default ModeConstructorBlock;
