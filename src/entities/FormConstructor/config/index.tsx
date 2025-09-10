import Input from "./Input";
import * as InputOption from "./Input/settings";
import Select from "./Select";
import * as SelectOption from "./Select/settings";
import { defineComponent } from "@/shared/methods";

export { Input, Select };

export const fieldsList = [
    defineComponent({
        Component: Input,
        name: InputOption.componentName,
        settings: InputOption.inputSettings,
    }),
    defineComponent({
        Component: Select,
        settings: SelectOption.selectSettings,
        name: InputOption.componentName
    }),
];
