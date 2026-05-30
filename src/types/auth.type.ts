export interface LoginResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}