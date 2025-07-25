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
  total: number;
  page: number;
  serverSide?: boolean;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  alignment?: "start" | "end";
};

const TablePagination = (props: PaginationProps) => {
  const inFirstPage = props.page === 0;
  const inLastPage =
    props.page === Math.ceil(props.total / props.rowsPerPage) - 1;

  const noMorePages = props.total < props.rowsPerPage;
  if (noMorePages && props.page === 0) {
    return null;
  }

  const onRowsPerPageChange = (e: any) => {
    props.setRowsPerPage(parseInt(e.target.value, 10));
    props.setPage(0);
  };

  const goToFirstPage = () => props.setPage(0);
  const goToPreviousPage = () => props.setPage(Math.max(props.page - 1, 0));

  const goToNextPage = () => {
    let nextPage = props.page + 1;
    if (!props.serverSide) {
      nextPage = Math.min(
        nextPage,
        Math.ceil(props.total / props.rowsPerPage) - 1
      );
    }

    props.setPage(nextPage);
  };

  const goToLastPage = () =>
    props.setPage(Math.ceil(props.total / props.rowsPerPage) - 1);

  return (
    <Stack
      direction={"row"}
      justifyContent={`flex-${props.alignment || "end"}`}
      alignItems="center"
      sx={{ width: "100%", py: 1, mt: 2 }}
      spacing={2}
    >
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Typography>Rows per page:</Typography>
        <StyledSelect
          value={props.rowsPerPage}
          onChange={(e) => onRowsPerPageChange(e)}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </StyledSelect>
      </Stack>

      <Stack direction={"row"} alignItems="center" spacing={1}>
        <IconButton size="small" disabled={inFirstPage} onClick={goToFirstPage}>
          <Icon icon="lucide:chevron-first" fontSize={"1.5rem"} />
        </IconButton>

        <IconButton
          size="small"
          disabled={inFirstPage}
          onClick={goToPreviousPage}
        >
          <Icon icon="lucide:chevron-left" fontSize={"1.5rem"} />
        </IconButton>

        <Typography>{`Page: ${props.page + 1}`}</Typography>

        <IconButton size="small" disabled={noMorePages} onClick={goToNextPage}>
          <Icon icon="lucide:chevron-right" fontSize={"1.5rem"} />
        </IconButton>

        <IconButton
          size="small"
          disabled={props.serverSide || noMorePages || inLastPage}
          onClick={goToLastPage}
        >
          <Icon icon="lucide:chevron-last" fontSize={"1.5rem"} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default TablePagination;
