import { Box, Paper, Typography } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Pagination, StyledSearch, StyledTable } from "./styles";
import React, { ReactNode, useEffect, useState } from "react";

import { BarLoader } from "../Monitors";
import { CButton } from "../Buttons";
import { ErrorPage } from "../Alerts";

export type TableButton = {
  onClick: () => void;
  children: any;
  sx?: any;
};

export type TableColumn = {
  name: string;
  selector: string | ((item: any) => ReactNode); 
  button?: boolean;
  style?: any;
};

export type TableProps<T> = {
  title?: string;
  loading?: boolean;
  error?: Error;
  columns: TableColumn[];
  data: any[];
  showSearch?: boolean;
  onSearch?: (value: string, setRows: any) => void;
  buttons?: TableButton[];
  onRowClicked?: (row: T) => void;
  rowsPerPageOptions?: number[];
  sx?: any;
};

export default function Table({
  title,
  loading,
  error,
  columns,
  data,
  showSearch,
  onSearch,
  buttons = [],
  onRowClicked,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
  sx = {},
}: TableProps<any>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

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

  const handleSearch = ({ value, name }: any) => {
    if (onSearch) {
      onSearch(value, setRows);
      return;
    }

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
            showSearch && buttons.length > 0
              ? "space-between"
              : showSearch && buttons.length === 0
              ? "end"
              : "start",
        }}
      >
        <Box>
          {buttons.map((button, index) => (
            <CButton key={index} {...button} />
          ))}
        </Box>
        <StyledSearch
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          style={{ display: showSearch ? "block" : "none" }}
        />
      </Box>

      {loading ? (
        <BarLoader />
      ) : error ? (
        <ErrorPage error={error} title="Oops!" />
      ) : (
        <>
          {rows.length === 0 ? (
            <Paper sx={{...paperStyle, py:3}} elevation={0}>
              <Typography
                variant="h6"
                textAlign="center"
                color="grey"
              >
                No data found
              </Typography>
              <Typography variant="body2" textAlign="center" color="grey">
                We couldn't find any data at the moment.
              </Typography>
            </Paper>
          ) : (
            <Paper sx={paperStyle} elevation={0}>
              {title ? <Typography variant="h6">{title}</Typography> : null}
              <StyledTable>
                <thead>
                  <tr>
                    {cols.map((column: TableColumn, cIndex: number) => (
                      <th key={cIndex}>{column.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item: any, rIndex: number) => (
                      <tr key={rIndex}>
                        {cols.map((column: TableColumn, cIndex: number) => (
                          <td
                            key={cIndex}
                            style={column?.style || {}}
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
                  {`Page ${page + 1} of ${Math.ceil(
                    rows.length / rowsPerPage
                  )}`}
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
          )}
        </>
      )}
    </>
  );
}
