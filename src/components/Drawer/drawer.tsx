import styled from "@emotion/styled";
import { Icon } from "@iconify/react";
import { IconButton, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import React from "react";

const Content = styled(Box)`
  width: ${(props) => `${props.width}vw`};
  height: 100vh;
  padding: 0;
  position: relative;
`;

const Title = styled(Box)`
  height: 50px;
  position: sticky;
  border-radius: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  z-index: 1;
`;

const Body = styled(Box)`
  position: relative;
  overflow-y: auto;
  height: calc(100% - 50px);
  z-index: 0;
`;

export type CDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  autoClose?: boolean;
  title: string | React.ReactNode;
  children: React.ReactNode;
  width?: number;
};

export const CDrawer = ({
  open,
  setOpen,
  autoClose = true,
  title,
  children,
  width = 60,
}: CDrawerProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  let drawerTitle = title;

  if (!title) {
    drawerTitle = "Drawer Title";
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(_, reason) => {
        if (autoClose && reason === "backdropClick") {
          setOpen(false);
        }
      }}
    >
      <Content width={isMobile ? 100 : width}>
        <Title sx={{ px: isMobile ? 1 : 5 }}>
          <Box sx={{ flex: 1 }}>{drawerTitle}</Box>
          <IconButton onClick={() => setOpen(false)} color="error">
            <Icon icon="tabler:x" />
          </IconButton>
        </Title>
        <Body
          sx={{
            px: isMobile ? 1 : 5,
            py: isMobile ? 1 : 2,
          }}
        >
          {children}
        </Body>
      </Content>
    </Drawer>
  );
};
