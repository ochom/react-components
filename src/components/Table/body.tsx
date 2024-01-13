import { typeOf } from "react-is";
import { TableColumn } from "./props";
import { StyledTable } from "./styles";
import React, { useMemo } from "react";
import { BarLoader } from "../Monitors";
import { ErrorPage } from "../EmptyPage";
import { Box } from "@mui/material";

const TableBody = ({
  loading,
  error,
  message,
  cols,
  rows,
  rowsPerPage,
  page,
  onRowClicked,
}: any) => {
  const handleRowClicked = (col: TableColumn, item: any) => {
    if (col.button) {
      return;
    }
    if (onRowClicked) {
      onRowClicked(item);
    }
  };

  const getColumnValue = (column: TableColumn, item: any) => {
    if (typeof column.selector === "function") {
      return column.selector(item);
    }

    return item[column.selector];
  };

  const Spanned = ({ children, span }: any) => {
    return (
      <td colSpan={span} style={{ padding: 0 }}>
        {children}
      </td>
    );
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {cols.map((column: TableColumn, cIndex: number) => (
            <th key={cIndex}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr
          style={{
            display:
              loading || error || rows.length === 0 ? "table-row" : "none",
            backgroundColor: "transparent",
          }}
        >
          {loading && (
            <Spanned span={cols.length}>
              <BarLoader />
            </Spanned>
          )}

          {error && rows.length === 0 && (
            <Spanned span={cols.length}>
              <ErrorPage error={error} title="Oops!" />
            </Spanned>
          )}

          {!loading && rows.length === 0 && (
            <Spanned span={cols.length}>
              <Box sx={{ textAlign: "center", py: 3 }}>{message}</Box>
            </Spanned>
          )}
        </tr>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item: any, rIndex: number) => (
            <tr key={rIndex}>
              {cols.map((column: TableColumn, cIndex: number) => (
                <td
                  key={cIndex}
                  style={column?.style || {}}
                  onClick={() => handleRowClicked(column, item)}
                >
                  {getColumnValue(column, item)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </StyledTable>
  );
};

export default TableBody;
