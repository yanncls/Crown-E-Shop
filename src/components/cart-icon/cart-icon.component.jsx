import { useContext } from "react";
import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./card-icon.styles.jsx";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer
      className="cart-icon-container"
      onClick={toggleIsCartOpen}
    >
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
