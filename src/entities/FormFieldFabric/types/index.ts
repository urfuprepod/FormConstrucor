export interface ILabelProps {
    fontSize?: number;
    color: string;
    value?: string;
}

export interface IFieldOptions {
    placeholder?: string;
    label: ILabelProps;
    isDisabled?: boolean;
    name: string;
    required?: boolean;
}

export interface ISelectOption {
    label: string;
    value: string;
}

export type Field =
    | {
          variant: "input";
          options: InputOptions;
      }
    | {
          variant: "select";
          options: SelectOptions;
      };

export interface InputOptions extends IFieldOptions {
    type?: "text" | "password" | "email" | "number";
    maxLength?: number;
    minLength?: number;
}

export interface SelectOptions extends IFieldOptions {
    options: ISelectOption[];
    multiple?: boolean;
    notFoundContent?: React.ReactNode;
}
