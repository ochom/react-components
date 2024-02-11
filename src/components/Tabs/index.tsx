import { Box, Tab, Tabs } from "@mui/material";

import React from "react";

export interface TabProps {
  title: string;
  panel: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function Panel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function CustomTabs({
  index,
  setIndex,
  tabs,
}: {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  tabs: TabProps[];
}) {
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
            label={tab.title}
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
