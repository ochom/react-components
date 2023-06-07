import styled from "@emotion/styled";
import { Search as SearchIcon } from "@mui/icons-material";
import { Box, SxProps } from "@mui/material";
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
        color: #202124;
        text-align: left;
        background-color: #f0f0f0;
        :first-of-type {
          border-top-left-radius: 15px;
        }
        :last-of-type {
          border-top-right-radius: 15px;
        }
      }
    }
  }
  tbody {
    tr {
      margin: 0 5px;
      transition: 0.3s;
      :nth-of-type(even) {
        background-color: #f9f9f9;
      }
      td {
        padding: 12px 8px;
        font-size: 0.8rem;
      }
    }
    tr:hover {
      cursor: pointer;
      background-color: #eeeeee;
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

export const Pagination = styled.div`
  margin: 25px 0;
  display: flex;
  justify-content: start;
  align-items: center;
  color: #555;
  font-weight: 300;
  font-size: 14px;

  select {
    margin: 0px 4px;
    padding: 0px 14px;
    border-radius: 4px;
    border: none;
    color: inherit;
    font-weight: inherit;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
      no-repeat 95% 50%;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    &:focus {
      outline: none;
    }
  }

  button {
    height: 20px;
    line-height: 0;
    padding: 0px;
    cursor: pointer;
    border: none;
    font-size: 18px;
    background-color: #fff;
  }

  button:disabled {
    color: #ccc;
    background-color: #fff;
    cursor: not-allowed;
  }

  span {
    margin: 0 8px;
    font-size: inherit;
  }
`;

const Icon = styled(SearchIcon)`
  color: #949494;
  font-size: 0.9rem;
  font-weight: 400;
`;

const SearchBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  box-shadow: 0 0 3px 0 #dfdfdf;
  padding: 0.3rem 0.5rem;
  overflow: hidden;
  input {
    border: none;
    outline: none;
    font-size: 0.8rem;
    font-weight: 400;
    color: #333333;
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
  return (
    <SearchBox sx={sx}>
      <Icon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
