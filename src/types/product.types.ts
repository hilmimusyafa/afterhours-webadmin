export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
}

export interface ProductsListResponse {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ProductInfoResponse {
    data: Product;
}

export interface ProductMutationResponse {
    message: string;
    data: Product;
}

export interface ProductDeleteResponse {
    success: boolean;
    message: string;
}
