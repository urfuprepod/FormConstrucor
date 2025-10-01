declare module "*.module.css";
declare module "*.module.scss";

declare global {
    interface IConstructorColumn {
        orderNumber: number;
        gridId: string;
        rowNumber: number;
        sectionWidth: number;
        id: string;
    }

    interface IConstructorGrid {
        colId: string | null
        id: string
    }
}

export {}
