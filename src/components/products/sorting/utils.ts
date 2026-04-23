import type { Product } from "../../../types/Types";

/** 
 * Vastly shortens the code that handles filtering and sorting, and makes it trivial to sort on additional attributes by adding records (thanks CoPilot)
 *  */
export const sortComparators: Record<string, (a: Product, b: Product) => number> = { 
    Price: (a, b) => a.price - b.price,
    Rating: (a, b) => a.rating.rate - b.rating.rate,
};