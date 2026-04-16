import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { ErrorPage } from "../EmptyPage";
import { BarLoader } from "../Monitors";
import { TableColumn } from "./props";
import Headers from "./headers";

const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "transparent",
  "& thead tr": {
    border: "none",
  },
  "& thead th": {
    padding: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: theme.palette.action.hover,
  },
  "& tbody tr": {
    margin: "0 5px",
    transition: "0.3s",
    borderBottom: `1px solid ${theme.palette.action.hover}`,
  },
  "& tbody td": {
    padding: "8px",
  },
  "& tbody tr:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.action.hover,
  },
}));

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
  sort?: string;
  onSort?: (value: string) => void;
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
  sort,
  onSort,
}: TableBodyProps) => {
  const handleRowClicked = (col: TableColumn, item: any) => {
    if (col.is_button) {
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
    <StyledTable>
      <Headers columns={cols} sort={sort} setSort={(s) => onSort?.(s)} />
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
