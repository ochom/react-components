import { Box, Tab, Tabs } from "@mui/material";

import React from "react";

export interface TabProps {
  title: string;
  panel: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function Panel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </Box>
  );
}

interface TabsProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  tabs: TabProps[];
}

export default function CustomTabs({ index, setIndex, tabs }: TabsProps) {
  return (
    <Box>
      <Tabs
        value={index}
        onChange={(e: any, newValue: number) => setIndex(newValue)}
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
        <Panel key={idx} value={index} index={idx}>
          {tab.panel}
        </Panel>
      ))}
    </Box>
  );
}
