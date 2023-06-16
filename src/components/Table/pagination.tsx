import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { PaginationContainer } from "./styles";
import React, { useMemo } from "react";
import { Pagination, Stack } from "@mui/material";

const TablePagination = ({
  rows,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions,
}: any) => {
  const totalRecords: number = useMemo(() => rows.length, [rows]);
  const totalPages: number = useMemo(
    () => Math.ceil(totalRecords / rowsPerPage),
    [totalRecords, rowsPerPage]
  );

  const changeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  if (totalRecords < rowsPerPage) {
    return null;
  }

  return (
    <PaginationContainer direction="row" spacing={1}>
      <span>Rows per page</span>
      <select value={rowsPerPage} onChange={changeRowsPerPage}>
        {rowsPerPageOptions.map((option: number) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Pagination
        page={page}
        count={totalPages}
        onChange={(e, v) => setPage(v)}
      />
    </PaginationContainer>
  );
};

export default TablePagination;
