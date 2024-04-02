import styled from "@emotion/styled";
import { Icon } from "@iconify/react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import React from "react";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: none;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  thead {
    tr {
      border: none;
      th {
        padding: 8px;
        font-weight: 500;
        font-size: 14px;
        text-align: left;
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.palette.action.hover};
      }
    }
  }
  tbody {
    tr {
      margin: 0 5px;
      transition: 0.3s;
      border-top: 1px solid transparent;
      :nth-of-type(odd) {
        border-top: 1px solid
          ${({ theme }: { theme: Theme }) => theme.palette.divider};
      }
      td {
        padding: 12px 8px;
        font-size: 0.8rem;
      }
    }
    tr:hover {
      cursor: pointer;
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.palette.action.hover};
    }
    tr:last-of-type {
      td {
        :first-of-type {
          border-bottom-left-radius: 15px;
        }
        :last-of-type {
          border-bottom-right-radius: 15px;
        }
      }
    }
  }
`;

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
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchBox>
  );
};

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;
