import { BoxProps, ButtonProps, PaperProps } from "@mui/material";
import { ReactNode } from "react";

export type TableColumn = {
  selector: string | ((row: any) => ReactNode);
  name?: string;
  title?: string;
  sortable?: boolean;
  is_button?: boolean;
  style?: any;
};

export type TableProps = {
  id?: string;
  loading?: boolean;
  error?: any;
  columns: TableColumn[];
  data: any[];
  emptyMessage?: string;
  onSearch?: (value: string) => void;
  buttons?: ButtonProps[];
  onRowClicked?: (row: any) => void;
  serverSide?: boolean;
  paginationAlign?: "start" | "end";
  onPaginationChange?: (page: number, rowsPerPage: number) => void;
  containerProps?: BoxProps;
  tableAreaProps?: PaperProps;
};
