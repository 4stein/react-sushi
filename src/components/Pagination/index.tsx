import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type TPaginationProps = {
  currentPage: number;
  pagesCount: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<TPaginationProps> = ({
  currentPage,
  pagesCount,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pagesCount}
    forcePage={currentPage - 1}
  />
);
