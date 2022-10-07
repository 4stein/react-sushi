import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../../components/Categories";
import SushiBlock from "../../components/SushiBlock";
import Sort, { sortArray } from "../../components/Sort";
import { Skeleton } from "../../components/SushiBlock/Skeleton";
import { Pagination } from "../../components/Pagination";
import {
  filterSelector,
  setCategoryIdAction,
  setCurrentPageAction,
  setFiltersAction,
} from "../../redux/slices/filterSlice";
import { fetchItemsAction, sushiSelector } from "../../redux/slices/sushiSlice";

type TSushiCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const Home: React.FC = () => {
  // useNavigate
  const navigate = useNavigate();
  // useRef
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  // useSelector
  const { searchValue, categoryId, currentPage, sortType } =
    useSelector(filterSelector);
  const { items, pagesCount, isLoading, errors } = useSelector(sushiSelector);
  // useDispatch
  const dispatch = useDispatch();
  // useCallback
  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryIdAction(idx));
    // eslint-disable-next-line
  }, []);
  // useEffect
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFiltersAction({
          ...params,
          sortType: sortArray.find(
            (obj) => obj.sortProperty === params.sortProperty
          ),
        })
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const fetchSushis = async () => {
      const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sortType.sortProperty.replace("-", "");
      const search = searchValue ? `&search=${searchValue}` : "";

      dispatch(
        fetchItemsAction({ currentPage, category, sortBy, order, search })
      );
    };

    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchSushis();
    }

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort sortType={sortType} />
      </div>
      {errors ? (
        <div className="content__error-info">
          <h2>An error has occurred 😞</h2>
          <p>
            Unfortunately, it was not possible to get pits. Please try again
            later.
          </p>
        </div>
      ) : (
        <>
          <h2 className="content__title">All rolls</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
              : items.map((item: TSushiCartItem) => (
                  <SushiBlock key={item.title} {...item} />
                ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pagesCount={pagesCount}
            onChangePage={(value: number) =>
              dispatch(setCurrentPageAction(value))
            }
          />
        </>
      )}
    </div>
  );
};

export default Home;
