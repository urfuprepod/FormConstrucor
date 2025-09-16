declare global {
    interface Array<T> {
        filterMap<U>(
            filterFn: (value: T, index: number, array: T[]) => boolean,
            mapFn: (value: T, index: number, array: T[]) => U,
            thisArg?: any
        ): U[];
    }
}

if (!Array.prototype.filterMap) {
    Array.prototype.filterMap = function <T, U>(
        filterFn: (value: T, index: number, array: T[]) => boolean,
        mapFn: (value: T, index: number, array: T[]) => U,
        thisArg?: any
    ): U[] {
        // Проверяем корректность callback
        if (typeof filterFn !== "function" || typeof mapFn !== "function") {
            throw new TypeError("Callback должен быть функцией");
        }

        const result: U[] = [];
        const array = this as T[];
        const len = array.length;

        for (let i = 0; i < len; i++) {
            if (i in array && filterFn(array[i], i, array)) {
                result.push(mapFn.call(thisArg, array[i], i, array));
            }
        }

        return result;
    };
}

export {};
