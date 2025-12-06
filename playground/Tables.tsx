import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import { muiConfirm, RowActions, Table } from "../src";

export default function Tables() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any[]>([]);
  const [sort, setSort] = useState<string>("");

  function shuffleArray(array: any[]) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const json: any[] = await response.json();
        setData(shuffleArray([...json, ...json, ...json]));
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
        onSearch={(query) => console.log("Searching for", query)}
        loading={loading}
        error={error}
        data={data}
        sort={sort}
        onSort={(v) => {
          console.log("Sorting by", v);
          setSort(v);
        }}
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
            sortable: true,
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
