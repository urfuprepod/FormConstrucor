import { Form, type FormInstance } from "antd";

export function useFormWatch<T = any>(
    name: string | undefined,
    form?: FormInstance
): T | undefined {
    const value = Form.useWatch(name, form);

    return value as T | undefined;
}
