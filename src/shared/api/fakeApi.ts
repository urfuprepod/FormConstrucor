import form from "../test/form.json";

export const getFormConfig = (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.stringify(form.fields));
        }, 200);
    });
};
