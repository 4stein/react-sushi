import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addItemAction,
  TSushiCartItem,
  updateItemAction,
} from "../../redux/slices/cartSlice";
import { TCurrentSushi } from "../../redux/slices/sushiSlice";
import { RootState } from "../../redux/store";

export const typeNames = ["thin", "traditional"];

export const SushiBlock: React.FC<TCurrentSushi> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  // useState
  const [activeType, setActiveType] = React.useState("");
  const [activeSize, setActiveSize] = React.useState(0);
  // useRef
  const isMounted = React.useRef(false);
  // useSelector
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj: TSushiCartItem) => obj.id === id)
  );
  const addedCount = cartItem ? cartItem.count : 0;
  // useDispatch
  const dispatch = useDispatch();
  // handlers
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: activeType,
      size: activeSize,
    };
    dispatch(addItemAction(item));
  };
  // useEffect
  React.useEffect(() => {
    if (cartItem) {
      setActiveType(cartItem.type);
      setActiveSize(cartItem.size);
    } else {
      setActiveSize(sizes[0]);
      setActiveType(types[0].toString());
    }

    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (isMounted.current) {
      if (cartItem) {
        const item = {
          id,
          title,
          price,
          imageUrl,
          type: activeType,
          size: activeSize,
        };
        dispatch(updateItemAction(item));
      }
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [activeType, activeSize]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`sushi/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId.toString())}
                className={
                  activeType.toString() === typeId.toString() ? "active" : ""
                }
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => {
              return (
                <li
                  key={size}
                  onClick={() => {
                    setActiveSize(size);
                  }}
                  className={activeSize === size ? "active" : ""}
                >
                  {size} sm
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} $</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add to Cart</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SushiBlock;
