import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { muiConfirm, RowActions, Table } from "../src";

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
      } catch (err: any) {
        setError(err);
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
          {
            name: "Website",
            selector: "website",
          },
          {
            name: "Company",
            selector: "company.name",
          },
          {
            name: "Actions",
            selector: (row) => (
              <RowActions
                buttons={[
                  {
                    title: "Edit",
                    color: "primary",
                    icon: "akar-icons:edit",
                    onClick: () => console.log("Edit", row),
                  },
                ]}
              />
            ),
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
            onClick: () =>
              muiConfirm({
                title: "Delete",
                message: "Are you sure you want to delete this item?",
                onConfirm: () => console.log("Delete"),
                onCancel: () => console.log("Cancel"),
              }),
          },
        ]}
      />
    </Card>
  );
}
