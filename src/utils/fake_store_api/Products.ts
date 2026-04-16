export const FetchProductsAll = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`);

        const result = await response.json();
        console.log(result);
    } catch (error) {
        if (error instanceof Error)
            console.error('Failed to fetch products', error.message);
        
        throw error;
    }
}