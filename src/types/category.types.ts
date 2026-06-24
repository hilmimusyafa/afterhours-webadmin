export interface Category {
    id: number;
    name: string;
}

export interface CategoriesListResponse {
    data: Category[];
}

export interface CategoryMutationResponse {
    message: string;
    data: Category;
}

export interface CategoryDeleteResponse {
    success: boolean;
    message: string;
}
