import { Icon } from "@iconify/react";
import { Box, styled, SxProps, Theme, useTheme } from "@mui/material";

const SearchBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 0 0 3px 0
    ${({ theme }: { theme: Theme }) => theme.palette.action.hover};
  padding: 0.3rem 0.5rem;
  overflow: hidden;
  input {
    border: none;
    outline: none;
    font-size: 0.8rem;
    font-weight: 400;
    background-color: transparent;
    flex: 1;
    margin-left: 0.2rem;
    margin-right: 0.5rem;
  }
`;

export const StyledSearch = ({
  onSearch,
  sx,
}: {
  onSearch: (value: string) => void;
  sx: SxProps;
}) => {
  const theme = useTheme();
  return (
    <SearchBox sx={sx} theme={theme}>
      <Icon
        style={{ color: "action.active", margin: "0.5rem 1" }}
        icon="bi:search"
      />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e: any) => onSearch(e.target.value)}
      />
    </SearchBox>
  );
};
