import { Icon } from "@iconify/react";
import { IconButton, TextField } from "@mui/material";
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
    <TextField
      type="text"
      size="small"
      placeholder="Search..."
      value={searchValue}
      onChange={(e: any) => setSearchValue(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              size="small"
              title="Clear"
              aria-label="Clear"
              onClick={() => onSearch(searchValue)}
            >
              <Icon icon="tabler:search" />
            </IconButton>
          ),
        },
      }}
      sx={{
        maxWidth: 300,
        borderRadius: 15,
      }}
    />
  );
};
