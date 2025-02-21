import { Icon } from "@iconify/react";
import { IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export const StyledSearch = ({
  showSearch,
  serverSide,
  onSearch,
}: {
  showSearch?: boolean;
  serverSide?: boolean;
  onSearch: (value: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (serverSide) {
      return;
    }

    onSearch(searchValue);
  }, [searchValue]);

  if (!showSearch) return null;

  return (
    <Stack direction={"row-reverse"} alignItems={"center"} spacing={1}>
      <IconButton onClick={() => onSearch(searchValue)}>
        <Icon style={{}} icon="bi:search" />
      </IconButton>

      <TextField
        type="text"
        size="small"
        placeholder="Search..."
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.target.value)}
        sx={{
          position: "relative",
          maxWidth: 300,
          left: 0,
          top: 0,
          borderRadius: 15,
        }}
      />
    </Stack>
  );
};
