import { Box, Stack, Typography } from "@mui/material";
import { ButtonsContainer, StyledSearch } from "./styles";
import React, { useEffect, useMemo, useState } from "react";

import { CButton } from "../Buttons";
import { TableProps } from "./props";
import TableBody from "./body";
import TablePagination from "./pagination";

export default function Table({
  title,
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

  const flexSX: any = useMemo(() => {
    return buttons.length === 0 ? { flex: "1" } : {};
  }, [buttons]);

  return (
    <Box sx={sx}>
      {title && (
        <Typography variant="h6" sx={{ my: 2 }}>
          {title}
        </Typography>
      )}

      <ButtonsContainer>
        {buttons.length > 0 && (
          <Stack spacing={1} direction="row">
            {buttons.map((button, index) => (
              <CButton
                key={index}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 5 }}
                {...button}
              />
            ))}
          </Stack>
        )}
        {showSearch && rows.length > 0 ? (
          <StyledSearch onSearch={handleSearch} sx={{ ...flexSX }} />
        ) : null}
      </ButtonsContainer>

      <>
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

        <TablePagination
          total={total || rows.length}
          rows={rows}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </>
    </Box>
  );
}
