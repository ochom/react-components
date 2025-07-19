import { Icon } from "@iconify/react";
import { IconButton, Stack, styled, Typography } from "@mui/material";

const StyledSelect = styled("select")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.primary,
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
}));

type PaginationProps = {
  hidePagination?: boolean;
  total: number;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  alignment?: "start" | "end";
};

const TablePagination = ({
  hidePagination,
  total,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  alignment = "end",
}: PaginationProps) => {
  const noMorePages = page === 0 && total < rowsPerPage;
  if (noMorePages || hidePagination) {
    return null;
  }

  const onRowsPerPageChange = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const goToFirstPage = () => setPage(0);
  const goToPreviousPage = () => setPage(Math.max(page - 1, 0));
  const goToNextPage = () =>
    setPage(Math.min(page + 1, Math.ceil(total / rowsPerPage) - 1));
  const goToLastPage = () => setPage(Math.ceil(total / rowsPerPage) - 1);

  return (
    <Stack
      direction={"row"}
      justifyContent={`flex-${alignment || "end"}`}
      alignItems="center"
      sx={{ width: "100%", py: 1, mt: 2 }}
      spacing={2}
    >
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography>Rows per page:</Typography>
        <StyledSelect
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(e)}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </StyledSelect>
      </Stack>

      <Stack direction={"row"} alignItems="center" spacing={1}>
        <IconButton size="small" disabled={page === 0} onClick={goToFirstPage}>
          <Icon icon="lucide:chevron-first" fontSize={"1.5rem"} />
        </IconButton>

        <IconButton
          size="small"
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          <Icon icon="lucide:chevron-left" fontSize={"1.5rem"} />
        </IconButton>

        <Typography>{`Page: ${page + 1}`}</Typography>

        <IconButton size="small" disabled={noMorePages} onClick={goToNextPage}>
          <Icon icon="lucide:chevron-right" fontSize={"1.5rem"} />
        </IconButton>

        <IconButton size="small" disabled onClick={goToLastPage}>
          <Icon icon="lucide:chevron-last" fontSize={"1.5rem"} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default TablePagination;
