import { Box, Tab, Tabs } from "@mui/material";
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

function Panel(props: TabPanelProps) {
  const { children, currentTabIndex, panelIndex, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={currentTabIndex !== panelIndex}
      id={`simple-tabpanel-${panelIndex}`}
      aria-labelledby={`simple-tab-${panelIndex}`}
      {...other}
    >
      {currentTabIndex === panelIndex && <Box sx={{ py: 1 }}>{children}</Box>}
    </Box>
  );
}

interface TabsProps {
  index: number;
  setIndex: (index: number) => void;
  tabs: TabProps[];
}

export default function CustomTabs({ index, setIndex, tabs }: TabsProps) {
  return (
    <Box>
      <Tabs
        value={index}
        onChange={(_e: any, newValue: number) => setIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
      >
        {tabs.map((tab, idx) => (
          <Tab
            key={idx}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {tab.icon}
                {tab.title}
              </Box>
            }
            sx={{ fontWeight: 400, textTransform: "none" }}
            id={`simple-tab-${idx}`}
            aria-controls={`simple-tabpanel-${idx}`}
          />
        ))}
      </Tabs>

      {tabs.map((tab, idx) => (
        <Panel key={idx} currentTabIndex={index} panelIndex={idx}>
          {tab.panel}
        </Panel>
      ))}
    </Box>
  );
}
