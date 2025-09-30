declare global {
    interface Array<T> {
        filterMap<U>(
            filterFn: (value: T, index: number, array: T[]) => boolean,
            mapFn: (value: T, index: number, array: T[]) => U,
            thisArg?: any
        ): U[];
        filterSort(
            filterFn: (value: T, index: number, array: T[]) => boolean,
            sortFn: (first: T, second: T) => number
        ): T[];
    }
}

if (!Array.prototype.filterMap) {
    Array.prototype.filterMap = function <T, U>(
        filterFn: (value: T, index: number, array: T[]) => boolean,
        mapFn: (value: T, index: number, array: T[]) => U,
        thisArg?: any
    ): U[] {
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

if (!Array.prototype.filterSort) {
    Array.prototype.filterSort = function <T>(
        filterFn: (value: T, index: number, array: T[]) => boolean,
        sortFn: (first: T, second: T) => number
    ): T[] {
        if (typeof filterFn !== "function" || typeof sortFn !== "function") {
            throw new TypeError("Callback должен быть функцией");
        }

        const result: T[] = [];
        const array = this as T[];
        const len = array.length;

        for (let i = 0; i < len; i++) {
            if (i in array && filterFn(array[i], i, array)) {
                result.push(array[i]);
            }
        }

        return result.sort(sortFn);
    };
}

export {};
