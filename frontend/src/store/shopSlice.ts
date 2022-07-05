import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../utilty/api";

import { ShopType, ShopStateType } from "../types/shopType";

const initialState: ShopStateType = {
    shop: {
        data: [],
        loading: false,
        error: ""
    },
    cart: {
        data: [],
        loading: false,
        error: ""
    }
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(feachShopItems.pending, (state, action) => {
            state.shop.loading = true;
            state.shop.error = "";
        });
        builder.addCase(feachShopItems.fulfilled, (state, action: PayloadAction<any>) => {
            state.shop.data = action.payload;
            state.shop.loading = false;

        });
        builder.addCase(feachShopItems.rejected, (state, action) => {
            state.shop.loading = false;
            state.shop.error = "Error!"
        })
        builder.addCase(feachCartItems.pending, (state, action) => {
            state.cart.loading = true;
            state.cart.error = "";
        });
        builder.addCase(feachCartItems.fulfilled, (state, action: PayloadAction<any>) => {
            state.cart.data = action.payload;
            state.cart.loading = false;

        });
        builder.addCase(feachCartItems.rejected, (state, action) => {
            state.cart.loading = false;
            state.cart.error = "Error!"
        });
        builder.addCase(setCartItem.fulfilled, (state, action: PayloadAction<any>) => {
            state.cart.data = action.payload;
            state.cart.loading = false;
        });
        builder.addCase(removeCartItems.fulfilled, (state, action: PayloadAction<any>) => {
            state.cart.data = action.payload;
            state.cart.loading = false;

        });
    }
});


export const feachShopItems = createAsyncThunk("feachShopItems", async () => {
    const response = await Api.get<ShopType[]>("/getShopItems");
    return response.data
});

export const feachCartItems = createAsyncThunk("feachCartItems", async () => {
    const response = await Api.get<ShopType[]>("/getCartItems");
    return response.data
})
export const removeCartItems = createAsyncThunk("removeCartItems", async (id: string) => {
    const response = await Api.delete<any>("/delCartItem", { data: { id } });
    return response.data
})
export const setCartItem = createAsyncThunk("setCartItem", async (data: any) => {

    const response = await Api.post<any>(
        "/setCartItem",
        { shopItemId: data.selectedShopName, productName: data.productName }

    );
    return response.data
})


export default shopSlice.reducer;
