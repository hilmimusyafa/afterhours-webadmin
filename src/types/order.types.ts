export interface OrderItem {
    id: string;
    product_id: string;
    quantity: number;
    price_at_purchase: number;
    subtotal: number;
    product?: {
        id: string;
        name: string;
        category: string;
        image_url: string;
    };
}

export interface Order {
    id: string;
    user_id?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
    status: string;
    total_amount: number;
    shipping_address: string;
    shipping_lat: number;
    shipping_lng: number;
    created_at: string;
    updated_at?: string;
    items?: OrderItem[];
}

export interface OrdersListResponse {
    data: Order[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface OrderInfoResponse {
    data: Order;
}

export interface OrderUpdateStatusResponse {
    message: string;
    data: {
        id: string;
        status: string;
        updated_at: string;
    };
}
