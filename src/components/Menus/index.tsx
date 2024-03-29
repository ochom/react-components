import { Icon } from "@iconify/react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

import React, { useState } from "react";

export interface MenuOption {
  title: string;
  icon?: React.ReactNode;
  action: (row: any) => void;
  hidden?: (row: any) => boolean;
}

export interface MenuProps {
  row: any;
  options: MenuOption[];
}

export default function TableDropdownMenu({ row, options }: MenuProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: any) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon icon="bi:three-dots-vertical" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {(options || [])
          .filter((option) => !option.hidden || !option.hidden(row))
          .map((option) => (
            <MenuItem
              key={option.title}
              onClick={() => {
                handleClose();
                option.action(row);
              }}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.title}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}
