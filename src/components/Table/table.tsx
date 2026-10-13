import { Box, Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { StyledSearch } from "./styles";

import TableBody from "./body";
import TablePagination from "./pagination";
import { TableProps } from "./props";

export default function Table({
  loading = false,
  error,
  columns,
  data,
  emptyMessage = "No data on this page",
  onSearch,
  buttons = [],
  onRowClicked,
  serverSide = false,
  onPaginationChange,
  paginationAlign = "end",
  containerProps = {},
  tableAreaProps = {},
  sort,
  onSort,
}: TableProps) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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
    if (serverSide && onPaginationChange) {
      onPaginationChange(page + 1, rowsPerPage);
    }
  }, [page, rowsPerPage]);

  const handleSearch = (value: string) => {
    if (onSearch && serverSide) return onSearch(value);

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
          display: buttons.length == 0 && !onSearch ? "none" : "flex",
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
          {buttons
            ?.filter((button) => !button?.hidden)
            ?.map((button, index) => (
              <Button key={index} variant="outlined" {...button}>
                {button?.title ?? button?.children}
              </Button>
            ))}
        </Stack>
        <StyledSearch
          serverSide={serverSide}
          showSearch={!!onSearch}
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
          sort={sort}
          onSort={onSort}
        />

        <TablePagination
          total={rows?.length || 0}
          page={page}
          setPage={(nextPage) => {
            setPage(nextPage);
          }}
          serverSide={serverSide}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          alignment={paginationAlign}
        />
      </Paper>
    </Box>
  );
}
