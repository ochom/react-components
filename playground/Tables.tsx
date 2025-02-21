import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "../src";

export default function Tables() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Table
        showSearch
        onSearch={(query) => console.log("Searching for", query)}
        loading={loading}
        error={error}
        data={data}
        total={data.length}
        columns={[
          {
            name: "Name",
            selector: (row: any) => row.name,
          },
          {
            name: "Email",
            selector: (row: any) => row.email,
          },
          {
            name: "Phone",
            selector: "phone",
          },
        ]}
        buttons={[
          {
            children: "Add",
            variant: "contained",
            onClick: () => console.log("Add"),
          },
          {
            children: "Edit",
            color: "secondary",
            onClick: () => console.log("Edit"),
          },
          {
            children: "Delete",
            color: "error",
            onClick: () => console.log("Delete"),
          },
        ]}
      />
    </Card>
  );
}
