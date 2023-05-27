import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Pagination } from "./styles";
import React, { useMemo } from "react";

const TablePagination = ({
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions,
}: any) => {
  const totalRecords: number = useMemo(() => rows.length, [rows]);

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToLastPage = () => {
    setPage(Math.ceil(rows.length / rowsPerPage) - 1);
  };

  const goToNextPage = () => {
    setPage((prev: number) => prev + 1);
  };

  const goToPreviousPage = () => {
    setPage((prev: number) => prev - 1);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (totalRecords < rowsPerPage) {
    return null;
  }

  return (
    <Pagination>
      <span>Rows per page</span>
      <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
        {rowsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={goToFirstPage} disabled={page === 0}>
        <KeyboardDoubleArrowLeft />
      </button>
      <button onClick={goToPreviousPage} disabled={page === 0}>
        <KeyboardArrowLeft />
      </button>
      <span>
        {`Page ${page + 1} of ${Math.ceil(totalRecords / rowsPerPage)}`}
      </span>
      <button
        onClick={goToNextPage}
        disabled={page === Math.ceil(totalRecords / rowsPerPage) - 1}
      >
        <KeyboardArrowRight />
      </button>
      <button
        onClick={goToLastPage}
        disabled={page === Math.ceil(totalRecords / rowsPerPage) - 1}
      >
        <KeyboardDoubleArrowRight />
      </button>
    </Pagination>
  );
};

export default TablePagination;
