import { Checkbox, Paper, TextField } from "@mui/material";

import { ArrowDownward } from "@mui/icons-material";
import { BarLoader } from "../Monitors";
import { Box } from "@mui/system";
import DataTable from "react-data-table-component";
import React from "react";

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#4e0c8b1c",
      borderBottomColor: "#FFFFFF",
      borderRadius: "15px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
      marginTop: "30px",
      paddingBottom: "30px",
    },
  },
};

export interface TableProps {
  columns: [];
  rows: [];
  loading?: boolean;
  handleSearch?: (val: string) => void;
  onRowClicked?: (row: any) => void;
  pagination?: number[];
}

export default function Table({
  loading = false,
  columns,
  rows,
  handleSearch = (val) => {},
  onRowClicked = (row) => {},
  pagination = [10, 20, 30, 40, 50],
}: TableProps) {
  return (
    <Paper sx={{ position: "relative" }}>
      <DataTable
        progressComponent={<BarLoader />}
        progressPending={loading}
        pagination
        paginationRowsPerPageOptions={pagination}
        customStyles={customStyles}
        sortIcon={
          <ArrowDownward style={{ color: "grey", marginLeft: "5px" }} />
        }
        highlightOnHover
        pointerOnHover
        columns={columns}
        data={rows}
        onRowClicked={onRowClicked}
      />
      {rows.length > 0 && (
        <Box sx={{ position: "absolute", bottom: "30px", left: "50px" }}>
          <TextField
            sx={{ width: "200px" }}
            label="Search"
            color="primary"
            size="small"
            placeholder="Search ..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>
      )}
    </Paper>
  );
}
