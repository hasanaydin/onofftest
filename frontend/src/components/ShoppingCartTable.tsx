import { useEffect } from "react";
import { feachCartItems, removeCartItems } from "../fatures/shopSlice";
import { useAppDispatch, useAppSelector } from "../store";
import "./ShoppingCartTable.scss"

function ShoppingCartTable() {
    const dispacth = useAppDispatch();
    const shopItems = useAppSelector(state => state.shop);

    useEffect(() => {
        dispacth(feachCartItems())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const del = (id: string) => {
        dispacth(removeCartItems(id));
    }

    return (
        <div className="shoppingCartTable-container">
            {shopItems.cart.loading && <div className="shoppingCartTable-item-notice">Loading</div>}
            {shopItems.cart.error && <div className="shoppingCartTable-item-notice shoppingCartTable-item-notice-error">An unexpected error has occurred.</div>}
            {shopItems.cart.data && <>
                {shopItems.cart.data.map((shopItem) => (
                    <div key={shopItem.id} className="shoppingCartTable-item">
                        <div className="shoppingCartTable-itemRow">{shopItem.productName}</div>
                        <div className="shoppingCartTable-itemRow">{shopItem.shopItemId}</div>
                        <div className="shoppingCartTable-itemRow">
                            <button
                                className="shoppingCartTable-itemDelBtn"
                                onClick={() => { del(shopItem.id) }}>Delete</button>
                        </div>
                    </div>
                ))}
            </>}
            {shopItems.cart.data?.length === 0 && !shopItems.cart.error && !shopItems.cart.loading &&
                <div className="shoppingCartTable-item-notice shoppingCartTable-item-notice-empty">There are no items in the cart.</div>
            }
        </div>
    )
}
export default ShoppingCartTable