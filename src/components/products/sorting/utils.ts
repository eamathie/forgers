import type { Product } from "../../../types/Types";

/** 
 * Vastly shortens the code that handles filtering and sorting, and makes it trivial to sort on additional attributes by adding records (thanks CoPilot)
 *  */
export const sortComparators: Record<string, (a: Product, b: Product) => number> = { 
    Price: (a, b) => a.price - b.price,
    Rating: (a, b) => a.rating.rate - b.rating.rate,
};

export const filterProducts = (products: Product[], selectedCategories: string[], query: string): Product[] => {
    const normalizedQuery = query.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(normalizedQuery))
    .filter(product => selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase() === product.category.toLowerCase()));

    return filteredProducts;
}; 

export const sortProducts = (products: Product[], criterion: string, option: string): Product[] => {
    const sortedProducts = products.slice()
    .sort((a, b) => {
        if (criterion === "None" || option === "None") 
            return 0;
        
        const comparator = sortComparators[criterion];
        if (!comparator) 
            return 0;

        const result = comparator(a, b);
        return option === "Low-high" ? result : -result;
    });

    return sortedProducts;
};
