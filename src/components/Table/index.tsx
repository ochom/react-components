import { Box, Paper, TextField, Typography } from "@mui/material";
import DataTable, { TableProps } from "react-data-table-component";
import React, { ReactNode, useEffect } from "react";

import { ArrowDownward } from "@mui/icons-material";
import { BarLoader } from "../Monitors";

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
    style: {
      paddingTop: "5px",
      paddingBottom: "5px",
    },
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

export type MyTableProps<T> = {
  loading?: boolean;
  error?: Error;
  props?: TableProps<T>;
  sx?: any;
  showSearch?: boolean;
  newButton?: ReactNode;
};

export default function Table({
  loading,
  error,
  showSearch,
  props,
  sx = {},
  newButton = null,
}: MyTableProps<any>) {
  const [data, setData] = React.useState<any[]>(props?.data || []);

  useEffect(() => {
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

  const paperStyle = {
    ...sx,
    position: "relative",
    minWidth: "600px",
  };

  return (
    <Paper sx={paperStyle} elevation={0}>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          justifyContent: showSearch ? "space-between" : "end",
        }}
      >
        {newButton}
        {showSearch ? (
          <input
            type="text"
            placeholder="Search"
            style={{
              borderRadius: "5px",
              border: "none",
              padding: "5px 10px",
            }}
            onChange={handleSearch}
          />
        ) : null}
      </Box>
      <DataTable
        {...props}
        columns={props?.columns || []}
        data={data}
        progressComponent={<BarLoader />}
        progressPending={loading || false}
        pagination
        paginationRowsPerPageOptions={pagination}
        customStyles={customStyles}
        sortIcon={
          <ArrowDownward style={{ color: "grey", marginLeft: "5px" }} />
        }
        highlightOnHover
        pointerOnHover
      />
    </Paper>
  );
}
