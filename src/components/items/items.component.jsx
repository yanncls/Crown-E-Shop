import "./items.styles.scss";
import { useState, useEffect } from "react";
const Items = ({ cartItem }) => {
  //values
  const { name, quantity, price } = cartItem;

  // states

  //   ajouter ou retirer
  const decrease = (qty) => {
    console.log(qty);
  };

  const increase = () => console.log("+1");

  return (
    <div className="item-cart">
      <span>{name}</span>
      <span>
        <button onClick={decrease}>dec</button>
        {quantity}
        <button onClick={increase}>inc</button>
      </span>
      <span>{price}€</span>
      <button>supprimer</button>
    </div>
  );
};

export default Items;
