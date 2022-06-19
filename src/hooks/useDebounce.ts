import { useEffect } from "react";

export const useDebounce: (callback: Function, dependencies: unknown[], delay?: number) => void = (
    callback,
    dependencies,
    delay = 250
) => {
    useEffect(() => {
        const debounce = setTimeout(() => callback(), delay);

        return () => {
            clearTimeout(debounce);
        };
    }, [...dependencies]);
};
