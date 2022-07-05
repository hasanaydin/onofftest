import ShoppingCartTable from "./ShoppingCartTable";
import ShoppingCartForm from "./ShoppingCartForm";
import "./ShoppingCart.scss"

function ShoppingCart() {
    return (
        <div className="shoppingCart-container">
            <ShoppingCartForm />
            <ShoppingCartTable />
        </div>
    );
}

export default ShoppingCart;
