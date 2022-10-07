import React from "react";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => (
  <div className="container container--cart">
    <div className="cart cart--empty">
      <h2>Cart is empty</h2>
      <p>
        You probably haven't ordered sushi yet.
        <br />
        To order sishi, go to the main page.
      </p>
      <img src="img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  </div>
);

export default CartEmpty;
