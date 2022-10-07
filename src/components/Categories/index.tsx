import React from "react";

const categoriesArray: string[] = [
  "All",
  "Meat",
  "Vegetarian",
  "Grill",
  "Acute",
  "Closed",
];

type TCategoriesProps = {
  value: number;
  onClickCategory: (idx: number) => void;
};

const Categories: React.FC<TCategoriesProps> = React.memo(
  ({ value, onClickCategory }) => (
    <div className="categories">
      <ul>
        {categoriesArray.map((category, idx) => (
          <li
            key={category}
            className={value === idx ? "active" : ""}
            onClick={() => onClickCategory(idx)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
);

export default Categories;
