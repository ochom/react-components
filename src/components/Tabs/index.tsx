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
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  const handleChange = (e: any, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.title}
            sx={{ fontWeight: 400, textTransform: "none" }}
            id={`simple-tab-${index}`}
            aria-controls={`simple-tabpanel-${index}`}
          />
        ))}
      </Tabs>

      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          value={tabIndex}
          index={index}
          children={tab.panel}
        />
      ))}
    </Box>
  );
}
