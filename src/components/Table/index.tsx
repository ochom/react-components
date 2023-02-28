import { Box, Paper, Typography } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Pagination, StyledTable } from "./styles";
import React, { ReactNode, useEffect, useState } from "react";

import { BarLoader } from "../Monitors";
import { ErrorPage } from "../Alerts";

export type TableProps<T> = {
  title?: string;
  loading?: boolean;
  error?: Error;
  columns: any[];
  data: any[];
  showSearch?: boolean;
  newButton?: ReactNode;
  onRowClicked?: (row: T) => void;
  paginationRowsPerPageOptions?: number[];
  sx?: any;
};

export default function Table({
  title,
  loading,
  error,
  columns,
  data,
  showSearch,
  newButton = null,
  onRowClicked,
  paginationRowsPerPageOptions = [10, 20, 30, 40, 50],
  sx = {},
}: TableProps<any>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    paginationRowsPerPageOptions[0]
  );

  const [cols, setCols] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    if (columns) {
      setCols(columns);
    }
  }, [columns]);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const goToFirstPage = () => {
    setPage(0);
  };

  const goToLastPage = () => {
    setPage(Math.ceil(rows.length / rowsPerPage) - 1);
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    setPage(page - 1);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    const filteredRows: any[] = (data || []).filter((row: any) =>
      JSON.stringify(row).toLowerCase().includes(value.toLowerCase())
    );

    if (filteredRows.length > 0) {
      setRows(filteredRows);
    }
  };

  const handleRowClicked = (item: any) => {
    if (onRowClicked) {
      onRowClicked(item);
    }
  };

  if (loading) return <BarLoader />;
  if (error) return <ErrorPage error={error} title="Oops!" />;

  const paperStyle = {
    p: 1,
    pb: 2,
    minWidth: "600px",
    ...sx,
  };

  return (
    <>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          justifyContent:
            showSearch && newButton
              ? "space-between"
              : showSearch && !newButton
              ? "end"
              : "start",
        }}
      >
        {newButton}
        {showSearch ? (
          <input
            type="text"
            placeholder="Search"
            style={{
              borderRadius: "5px",
              border: "none",
              padding: "5px 10px",
            }}
            onChange={handleSearch}
          />
        ) : null}
      </Box>
      <Paper sx={paperStyle} elevation={0}>
        {title ? <Typography variant="h6">{title}</Typography> : null}
        <StyledTable>
          <thead>
            <tr>
              {cols.map((column: any, cIndex: number) => (
                <th key={cIndex} style={column.style}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item: any, rIndex: number) => (
                <tr key={rIndex}>
                  {cols.map((column: any, cIndex: number) => (
                    <td
                      key={cIndex}
                      style={column.style}
                      onClick={() => {
                        if (column?.button) {
                          return;
                        }
                        handleRowClicked(item);
                      }}
                    >
                      {typeof column.selector === "function"
                        ? column.selector(item)
                        : item[column.selector]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </StyledTable>
        <Pagination>
          <span>Rows per page</span>
          <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <button onClick={goToFirstPage} disabled={page === 0}>
            <KeyboardDoubleArrowLeft />
          </button>
          <button onClick={goToPreviousPage} disabled={page === 0}>
            <KeyboardArrowLeft />
          </button>
          <span>
            {`Page ${page + 1} of ${Math.ceil(rows.length / rowsPerPage)}`}
          </span>
          <button
            onClick={goToNextPage}
            disabled={page === Math.ceil(rows.length / rowsPerPage) - 1}
          >
            <KeyboardArrowRight />
          </button>
          <button
            onClick={goToLastPage}
            disabled={page === Math.ceil(rows.length / rowsPerPage) - 1}
          >
            <KeyboardDoubleArrowRight />
          </button>
        </Pagination>
      </Paper>
    </>
  );
}
