import { Checkbox, Paper, TextField, Typography } from "@mui/material";

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
  loading?: boolean;
  error?: Error;
  columns: [];
  rows: [];
  searchKeys?: string[];
  onRowClicked?: (row: any) => void;
  pagination?: number[];
}

export default function Table({
  loading = false,
  error,
  columns,
  rows,
  searchKeys = [],
  onRowClicked = (row) => {},
  pagination = [10, 20, 30, 40, 50],
}: TableProps) {
  const [data, setData] = React.useState<any>(rows);

  // search in objects
  const searchInObject = (obj: any, key: string, value: string): boolean => {
    if (obj[key] === undefined) {
      return false;
    }

    if (typeof obj[key] === "object") {
      return Object.keys(obj[key]).some((k) =>
        searchInObject(obj[key], k, value)
      );
    }

    if (typeof obj[key] === "string") {
      return obj[key].toLowerCase().includes(value.toLowerCase());
    }

    if (typeof obj[key] === "number") {
      return obj[key].toString().includes(value);
    }

    if (typeof obj[key] === "boolean") {
      return obj[key].toString().includes(value);
    }

    return false;
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    const filteredRows = data.filter((row: any) => {
      let found = false;
      searchKeys.forEach((key) => {
        found = searchInObject(row, key, value);
      });
      return found;
    });

    if (filteredRows.length > 0) {
      setData(filteredRows);
    }
  };

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" textAlign="center">
          {error.message}
        </Typography>
      </Paper>
    );
  }

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
            onChange={handleSearch}
          />
        </Box>
      )}
    </Paper>
  );
}
