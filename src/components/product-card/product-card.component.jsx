import {
  Name,
  Price,
  ProductCardContainer,
  Footer,
} from "./product-card.styles.jsx";

import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Ajouter au panier
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
