import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  currentSushiSelector,
  fetchCurrentSushiAction,
  TCurrentSushi,
} from "../../redux/slices/sushiSlice";
import styles from "./Sushi.module.scss";

const Sushi: React.FC = () => {
  const currentSushi: TCurrentSushi | null = useSelector(currentSushiSelector);
  // useParams
  const { id } = useParams();
  // useDispatch
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCurrentSushiAction({ id }));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="content">
      <div className="container">
        {currentSushi ? (
          <>
            <img
              className={styles.image}
              src={currentSushi.imageUrl}
              alt="sushi img"
            />
            <h2 className={styles.title}>{currentSushi.title}</h2>
            <h4 className={styles.subtitle}>{currentSushi.price} $</h4>
            <Link to="/">
              <button className="button button--outline button--add">
                <span>Go back</span>
              </button>
            </Link>
          </>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default Sushi;
