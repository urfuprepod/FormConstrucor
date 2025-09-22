import { useForm } from "antd/es/form/Form";
import { useRef, useState } from "react";

export const useFormData = () => {
    const [flag, setFlag] = useState<boolean>(false);
    const t = useRef<number | null>(null);

    const [form] = useForm();

    const updateFormState = (name: string, val: any) => {
        form.setFieldValue(name, val);
        if (t.current) {
            clearTimeout(t.current);
        }
        t.current = setTimeout(() => {
            setFlag((prev) => !prev);
        }, 500);
    };

    return {form, updateFormState}
};
