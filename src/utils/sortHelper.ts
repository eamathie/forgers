import type { SortDirection } from "../types/Types";

type SortOption = {
    option: SortDirection;
};

export const numericSort = <T>(sort: SortOption | undefined, selector: (item: T) => number) => {
    if (!sort) return () => 0;

    return (a: T, b: T) => sort.option === "Low-high" ? selector(a) - selector(b) : selector(b) - selector(a);
}