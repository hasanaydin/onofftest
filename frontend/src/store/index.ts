import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import shopSlice from "./shopSlice";

const store = configureStore({
    reducer: {
        shop: shopSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispach = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;