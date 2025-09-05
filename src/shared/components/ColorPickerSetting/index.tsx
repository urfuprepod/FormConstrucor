import { type FC } from "react";
import { ColorPicker, useColor, type IColor } from "react-color-palette";
import "./styles.css";

type Props = {
    value: string;
    updateValue: (val: string) => void;
};

const ColorPickerSetting: FC<Props> = (props) => {
    const { value, updateValue } = props;

    const [currentColor, setCurrentColor] = useColor(value);

    function updateColor(color: IColor) {
        setCurrentColor(color);
        updateValue(color.hex);
    }

    return (
        <div>
            <ColorPicker color={currentColor} onChange={updateColor} />;
        </div>
    );
};

export default ColorPickerSetting;
