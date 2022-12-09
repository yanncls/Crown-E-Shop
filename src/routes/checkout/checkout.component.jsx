import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const {
    cartItems,
    addItemToCart,
    removeItemToCart,
    deleteItemToCart,
    cartTotal,
  } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Produit</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantité</span>
        </div>
        <div className="header-block">
          <span>Prix</span>
        </div>
        <div className="header-block">
          <span>Supprimer</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total:{cartTotal}€</span>
    </div>
  );
};

export default Checkout;
