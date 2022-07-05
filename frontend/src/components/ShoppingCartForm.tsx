import { useEffect, useState } from "react";
import { feachShopItems, setCartItem } from "../store/shopSlice";
import { useAppDispatch, useAppSelector } from "../store";
import "../assets/ShoppingCartForm.scss"

function ShoppingCartForm() {
    const [productName, setProductName] = useState("");
    const [selectedShopName, setSelectedShopName] = useState();
    const [shopNameError, setShopNameError] = useState(false);
    const [productNameError, setProductNameError] = useState(false);
    const globalState = useAppSelector(state => state.shop);
    const dispacth = useAppDispatch();

    const onSave = () => {
        if (typeof selectedShopName === "undefined")
            setShopNameError(true);
        if (productName === "")
            setProductNameError(true)

        if (typeof selectedShopName !== "undefined" && productName !== "") {
            dispacth(setCartItem({ productName, selectedShopName }));
            setProductName("");
            setProductNameError(false)
            setShopNameError(false);
        }
    }

    const onShopOntionChange = (e: { target: { value: any; }; }) => {
        setSelectedShopName(e.target.value);
    }

    useEffect(() => {
        dispacth(feachShopItems())
    }, [dispacth]);

    return (
        <div className="shoppingCartForm-container">
            <div className="shoppingCartForm-title">Add to cart:</div>
            <input
                className={`shoppingCartForm-input shoppingCartForm-inputText ${productNameError ? 'shoppingCartForm-inputText-error' : ''}`}
                type="text" name="productName" value={productName}
                onChange={(e) => setProductName(e.currentTarget.value)}
                placeholder="Name" />

            {globalState.shop.data && <select onChange={onShopOntionChange} defaultValue={'null'}
                className={`shoppingCartForm-input shoppingCartForm-inputOption ${shopNameError ? 'shoppingCartForm-inputOption-error' : ''}`}
            >
                <option value="null" disabled={true} >Select Shop</option>
                {globalState.shop.data.map((shopItem) => (
                    <option key={shopItem.id}>{shopItem.name}</option>
                ))}
            </select>}
            <button className="shoppingCartForm-submitBtn" onClick={onSave}>Add</button>

        </div>
    )
}
export default ShoppingCartForm