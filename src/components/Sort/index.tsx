import React from "react";
import { useDispatch } from "react-redux";
import { setSortTypeAction, TSortType } from "../../redux/slices/filterSlice";
import { SortSvg } from "../UI";

// types
type TOutsideClick = MouseEvent & { path: Node[] };
type TSortProps = {
  sortType: TSortType;
};

export const sortArray: TSortType[] = [
  { name: "Popular (DESC)", sortProperty: "rating" },
  { name: "Popular (ASC)", sortProperty: "-rating" },
  { name: "Price  (DESC)", sortProperty: "price" },
  { name: "Price (ASC)", sortProperty: "-price" },
  { name: "Alphabet (DESC)", sortProperty: "title" },
  { name: "Alphabet (ASC)", sortProperty: "-title" },
];

const Sort: React.FC<TSortProps> = React.memo(({ sortType }) => {
  const sortRef = React.useRef<HTMLDivElement>(null);
  // useState
  const [isVisible, setIsVisible] = React.useState(false);
  // useDispatch
  const dispatch = useDispatch();

  React.useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      const _event = event as TOutsideClick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", onOutsideClick);

    return () => {
      document.body.removeEventListener("click", onOutsideClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <SortSvg />
        <b>Sort by:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortType.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortArray.map((obj: TSortType) => (
              <li
                key={obj.name}
                className={
                  sortType.sortProperty === obj.sortProperty ? "active" : ""
                }
                onClick={() => {
                  dispatch(setSortTypeAction(obj));
                  setIsVisible(false);
                }}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
