import { Icon } from "@iconify/react";
import { Stack, Typography } from "@mui/material";
import { TableColumn } from "./props";
import { grey } from "@mui/material/colors";

const Header = ({
  sort,
  column,
  setSort,
}: {
  sort?: string;
  column: TableColumn;
  setSort: (value: string) => void;
}) => {
  const isAsc = sort === `${column.selector}:asc`;
  const isDesc = sort === `${column.selector}:desc`;

  console.log("Header sort:", sort, "column", column);

  const handleSort = () => {
    if (!column.sortable || typeof column.selector !== "string") {
      return;
    }

    if (!isAsc && !isDesc) {
      setSort(`${column.selector}:asc`);
    } else if (isAsc) {
      setSort(`${column.selector}:desc`);
    } else if (isDesc) {
      setSort("");
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems="center"
      onClick={handleSort}
      spacing={1}
      sx={{
        cursor: column.sortable ? "pointer" : "default",
        borderRight: `1px solid ${grey[500]}`,
        pr: 1,
      }}
    >
      {column.sortable && (
        <>
          <Stack direction={"column"} spacing={0}>
            <Icon icon={isAsc ? "prime:sort-up-fill" : "prime:sort-up"} />
            <Icon icon={isDesc ? "prime:sort-down-fill" : "prime:sort-down"} />
          </Stack>
        </>
      )}
      <Typography fontWeight={600}>{column?.title ?? column?.name}</Typography>
    </Stack>
  );
};

export default function Headers({
  columns,
  sort,
  setSort,
}: {
  columns: TableColumn[];
  sort?: string;
  setSort?: (value: string) => void;
}) {
  return (
    <thead>
      <tr>
        {columns.map((column: TableColumn, cIndex: number) => (
          <th key={cIndex}>
            <Header column={column} sort={sort} setSort={(v) => setSort?.(v)} />
          </th>
        ))}
      </tr>
    </thead>
  );
}
