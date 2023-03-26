import { Box, Tab, Tabs } from "@mui/material";

import React from "react";

export interface TabProps {
  title: string;
  panel: React.ReactNode;
}

export interface TabsProps {
  tabs: TabProps[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

export default function CustomTabs({ tabs }: TabsProps) {
  const [index, setIndex] = React.useState<number>(0);

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
        <TabPanel key={idx} value={index} index={idx} children={tab.panel} />
      ))}
    </Box>
  );
}
