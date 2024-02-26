import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { Icon } from "@iconify/react";
import styled from "@emotion/styled";

const Content = styled(Box)(({ theme, ...props }) => ({
  width: `${props?.width}vw`,
  height: "100vh",
  padding: 0,
  position: "relative",
}));

const Title = styled(Box)(({ theme }: any) => ({
  height: "50px",
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
  borderBottom: "1px solid #ccc",
}));

const Body = styled(Box)`
  position: relative;
  overflow-y: auto;
  height: calc(100% - 50px);
`;

export type CDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  width?: number;
};

export const CDrawer = ({
  open,
  setOpen,
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
    <Drawer anchor="right" open={open}>
      <Content width={isMobile ? 100 : width}>
        <Title>
          <Typography variant="body1" component="div" sx={{ flex: 1 }}>
            {drawerTitle}
          </Typography>
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
