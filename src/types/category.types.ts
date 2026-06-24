export interface Category {
    id: number;
    name: string;
    is_default?: boolean;
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
