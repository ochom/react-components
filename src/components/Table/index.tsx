import DataTable, { TableProps } from "react-data-table-component";
import { Paper, TextField, Typography } from "@mui/material";

import { ArrowDownward } from "@mui/icons-material";
import { BarLoader } from "../Monitors";
import { Box } from "@mui/system";
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

export interface MyTableProps<T> {
  loading?: boolean;
  error?: Error;
  props?: TableProps<T>;
}

export default function Table({
  loading = false,
  error,
  props,
}: MyTableProps<any>) {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    setData(props?.data || []);
  }, [props?.data]);

  const handleSearch = (e: any) => {
    const value = e.target.value;
    const filteredRows: any[] = (props?.data || []).filter((row: any) =>
      JSON.stringify(row).toLowerCase().includes(value.toLowerCase())
    );

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

  const pagination = props?.paginationRowsPerPageOptions || [
    10, 20, 30, 40, 50,
  ];

  return (
    <Paper elevation={0}>
      <Box>
        <TextField
          sx={{ width: "200px" }}
          label="Search"
          size="small"
          placeholder="Search ..."
          onChange={handleSearch}
        />
      </Box>
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
        data={data}
        columns={props?.columns || []}
        responsive={false}
        {...props}
      />
    </Paper>
  );
}
