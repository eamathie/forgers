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

// Cart
export type Cart = {
    id: number;
    userId: number;
    date: string;
    products: [
        {
            productId: number; 
            quantity: number
        }
    ]
}

// Radio button list
export type RadioButtonList = {
    title: string,
    options: string[]
}

// Selected radio button option
export type SortDirection = "Low-high" | "High-low";

export type SelectedRadioButtonOption = {
    title: string,
    option: string,
}