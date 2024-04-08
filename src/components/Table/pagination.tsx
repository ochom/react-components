import { Icon } from "@iconify/react";
import { Box, IconButton, TablePagination as Pagination } from "@mui/material";
import React from "react";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, mx: 2 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <Icon icon="mdi:page-first" fontSize="1.5rem" />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <Icon icon="mdi:navigate-before" fontSize="1.5rem" />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <Icon icon="mdi:navigate-next" fontSize="1.5rem" />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <Icon icon="mdi:page-last" fontSize="1.5rem" />
      </IconButton>
    </Box>
  );
}

const TablePagination = ({
  alignment,
  total,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions,
}: any) => {
  const onRowsPerPageChange = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const onPageChange = (_e: any, page: number) => {
    setPage(page);
  };

  if (total < rowsPerPage) {
    return null;
  }

  const labelDisplayedRows = ({ count, page }: any) => {
    return `Page ${page + 1} of ${Math.ceil(
      count / rowsPerPage
    )} (${count} records)`;
  };

  return (
    <Pagination
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: `flex-${alignment || "end"}`,
        flexWrap: "wrap",
      }}
      component="div"
      page={page}
      count={total}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onRowsPerPageChange={onRowsPerPageChange}
      onPageChange={onPageChange}
      ActionsComponent={TablePaginationActions}
      labelDisplayedRows={labelDisplayedRows}
    />
  );
};

export default TablePagination;
