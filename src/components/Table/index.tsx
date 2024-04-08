import { Box, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ButtonsContainer, StyledSearch } from "./styles";

import { CButton } from "../Buttons";
import TableBody from "./body";
import TablePagination from "./pagination";
import { TableProps } from "./props";

export default function Table({
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
      <ButtonsContainer
        sx={{ p: 1 }}
        style={{
          display: buttons.length == 0 && !showSearch ? "none" : "flex",
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
            <CButton
              key={index}
              variant="outlined"
              sx={{ borderRadius: 2 }}
              {...button}
            />
          ))}
        </Stack>
        <StyledSearch
          onSearch={handleSearch}
          sx={{
            display: showSearch ? "flex" : "none",
            flex: buttons.length == 0 ? "1" : undefined,
          }}
        />
      </ButtonsContainer>

      <Paper {...tableAreaProps}>
        <TableBody
          loading={loading}
          error={error}
          message={emptyMessage}
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
            total={total || rows.length}
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
