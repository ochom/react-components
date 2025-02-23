import styled from "@emotion/styled";
import { Box, Theme, useTheme } from "@mui/material";
import { useMemo } from "react";
import { ErrorPage } from "../EmptyPage";
import { BarLoader } from "../Monitors";
import { TableColumn } from "./props";

const StyledTable = styled("table")`
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
  thead {
    tr {
      border: none;
      th {
        padding: 8px;
        font-weight: bold !important;
        font-size: 14px;
        text-align: left;
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.palette.action.hover};
      }
    }
  }
  tbody {
    tr {
      margin: 0 5px;
      transition: 0.3s;
      border-bottom: 1px solid
        ${({ theme }: { theme: Theme }) => theme.palette.action.hover};
      td {
        padding: 8px;
      }
    }
    tr:hover {
      cursor: pointer;
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.palette.action.hover};
    }
  }
`;

const Spanned = ({ children, span }: any) => {
  return (
    <td colSpan={span} style={{ padding: 0 }}>
      {children}
    </td>
  );
};

type TableBodyProps = {
  loading: boolean;
  error: any;
  emptyRowsMessage: string;
  serverSide: boolean;
  cols: TableColumn[];
  rows: any[];
  rowsPerPage: number;
  page: number;
  onRowClicked?: (item: any) => void;
};

const TableBody = ({
  loading,
  error,
  emptyRowsMessage,
  serverSide,
  cols,
  rows,
  rowsPerPage,
  page,
  onRowClicked,
}: TableBodyProps) => {
  const theme = useTheme();
  const handleRowClicked = (col: TableColumn, item: any) => {
    if (col.button) {
      return;
    }
    if (onRowClicked) {
      onRowClicked(item);
    }
  };

  function getValueFromJson(json: any, selector: string) {
    return selector
      .split(/\.|\[|\]/)
      .filter(Boolean)
      .reduce((obj, key) => obj && obj[key], json);
  }

  const getColumnValue = (column: TableColumn, item: any) => {
    if (typeof column.selector === "function") {
      return column.selector(item);
    }

    return getValueFromJson(item, column.selector);
  };

  const sliced = useMemo(() => {
    if (serverSide) {
      return rows;
    }

    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  return (
    <StyledTable theme={theme}>
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

          {!loading && rows.length === 0 && !error && (
            <Spanned span={cols.length}>
              <Box sx={{ textAlign: "center", py: 3 }}>{emptyRowsMessage}</Box>
            </Spanned>
          )}
        </tr>
        {sliced.map((item: any, rIndex: number) => (
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
