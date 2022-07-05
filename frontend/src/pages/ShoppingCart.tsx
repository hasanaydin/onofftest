import ShoppingCartTable from "../components/ShoppingCartTable";
import ShoppingCartForm from "../components/ShoppingCartForm";
import "../assets/ShoppingCart.scss";

function ShoppingCart() {
    return (
        <div className="shoppingCart-container">
            <ShoppingCartForm />
            <ShoppingCartTable />
        </div>
    );
}

export default ShoppingCart;
