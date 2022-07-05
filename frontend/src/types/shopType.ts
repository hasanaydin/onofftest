export interface ShopType {
    id: string;
    name: string;
}
export interface CartType {
    id: string;
    shopItemId: string;
    productName: string;
}
export interface ShopStateType {
    shop: {
        data: ShopType[] | null;
        loading: boolean;
        error: string;
    }
    cart: {
        data: CartType[] | null;
        loading: boolean;
        error: string;
    }
}