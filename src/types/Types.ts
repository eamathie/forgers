// Product
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
} 

export type Rating = {
    rate: number;
    count: number;
}

// Radio button list
export type RadioButtonList = {
    title: string,
    options: string[]
}