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
}));

const Title = styled(Box)(({ theme }) => ({
  height: "50px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 10px",
  borderBottom: "1px solid #ccc",
}));

const Body = styled(Box)`
  width: '100%',
  height: 'calc(100vh - 50px)', 
  overflow-y: 'auto'
`;

export type CDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
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
