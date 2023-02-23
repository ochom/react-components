import { Box, Paper, TextField, Typography } from "@mui/material";
import DataTable, { TableProps } from "react-data-table-component";
import React, { useEffect } from "react";

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
  showSearch?: boolean;
  props?: TableProps<T>;
  sx?: any;
};

export default function Table({
  loading,
  error,
  showSearch,
  props,
  sx = {},
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
      {data.length > 0 && showSearch && <SearchBox onSearch={handleSearch} />}
    </Paper>
  );
}

const SearchBox = ({ onSearch }: any) => {
  return (
    <Box sx={{ position: "absolute", bottom: "30px", left: "50px" }}>
      <TextField
        sx={{ width: "200px" }}
        label="Search"
        size="small"
        placeholder="Search ..."
        onChange={onSearch}
      />
    </Box>
  );
};
