import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";

export interface TabProps {
  title: string;
  panel: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  panelIndex: number;
  currentTabIndex: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, currentTabIndex, panelIndex, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={currentTabIndex !== panelIndex}
      id={`simple-tabpanel-${panelIndex}`}
      aria-labelledby={`simple-tab-${panelIndex}`}
      {...other}
    >
      {currentTabIndex === panelIndex && children}
    </Box>
  );
}

interface TabsProps {
  index: number;
  setIndex: (index: number) => void;
  tabs: TabProps[];
  orientation?: "horizontal" | "vertical";
}

export default function CustomTabs(props: TabsProps) {
  const { index, setIndex, tabs } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: props.orientation === "vertical" ? "row" : "column",
        height: "100%",
      }}
    >
      <Tabs
        value={index}
        onChange={(_e: any, newValue: number) => setIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        orientation={props.orientation}
        allowScrollButtonsMobile
        sx={{
          minWidth: props.orientation === "vertical" ? 200 : "auto",
        }}
      >
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            label={
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent:
                    props.orientation === "vertical" ? "start" : "center",
                }}
              >
                {tab.icon}
                <Typography variant="body1">{tab.title}</Typography>
              </Box>
            }
            id={`simple-tab-${idx}`}
            aria-controls={`simple-tabpanel-${idx}`}
          />
        ))}
      </Tabs>

      {tabs.map((tab, idx) => (
        <TabPanel key={idx} currentTabIndex={index} panelIndex={idx}>
          {tab.panel}
        </TabPanel>
      ))}
    </Box>
  );
}
