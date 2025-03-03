import { Box, Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledSearch } from "./styles";

import TableBody from "./body";
import TablePagination from "./pagination";
import { TableProps } from "./props";

export default function Table({
  id,
  loading = false,
  error,
  columns,
  data,
  total,
  emptyMessage = "No data found",
  showSearch,
  onSearch,
  buttons = [],
  onRowClicked,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
  serverSide = false,
  onPaginationChange,
  hidePagination = false,
  paginationAlign = "end",
  containerProps = {},
  tableAreaProps = {},
}: TableProps) {
  const tableCache = JSON.parse(
    id ? localStorage.getItem(`ochom-react-tables-${id}`) || "{}" : "{}"
  );

  const [page, setPage] = useState(tableCache.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState(
    tableCache.rowsPerPage || rowsPerPageOptions[0]
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

  useEffect(() => {
    if (!id) return;
    localStorage.setItem(
      `ochom-react-tables-${id}`,
      JSON.stringify({ page, rowsPerPage })
    );
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (serverSide && onPaginationChange) {
      onPaginationChange(page + 1, rowsPerPage);
    }
  }, [page, rowsPerPage]);

  const handleSearch = (value: string) => {
    if (onSearch) return onSearch(value);

    const filteredRows: any[] = (data || []).filter((row: any) =>
      JSON.stringify(row).toLowerCase().includes(value.toLowerCase())
    );

    if (filteredRows.length > 0) {
      setRows(filteredRows);
    }
  };

  return (
    <Box {...containerProps}>
      <Box
        sx={{
          display: buttons.length == 0 && !showSearch ? "none" : "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <Stack
          spacing={1}
          direction="row"
          sx={{
            display: buttons.length == 0 ? "none" : "flex",
          }}
        >
          {buttons.map((button, index) => (
            <Button key={index} variant="outlined" {...button}>
              {button?.title ?? button?.children}
            </Button>
          ))}
        </Stack>
        <StyledSearch
          serverSide={serverSide}
          showSearch={showSearch}
          onSearch={handleSearch}
        />
      </Box>

      <Paper elevation={0} {...tableAreaProps}>
        <TableBody
          loading={loading}
          error={error}
          emptyRowsMessage={emptyMessage}
          serverSide={serverSide}
          cols={cols}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          onRowClicked={onRowClicked}
        />

        {!hidePagination && (
          <TablePagination
            alignment={paginationAlign}
            total={total ?? rows.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        )}
      </Paper>
    </Box>
  );
}
