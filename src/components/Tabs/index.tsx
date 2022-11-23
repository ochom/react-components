import { Box, Tab, Tabs } from "@mui/material";

import React from "react";
import { styled } from "@mui/material/styles";

const AntTabs = styled((props) => <Tabs {...props} />)(({ theme }) => ({
  borderBottom: "1px solid #e8e8e8",
  "&.MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  })
);

export interface TabProps {
  title: string;
  panel: React.ReactNode;
}

export default function CustomTabs(tabs: TabProps[]) {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Box sx={{ mt: 3 }}>
      <AntTabs
        value={tabIndex}
        onChange={(e: any, val: any) => setTabIndex(val)}
        indicatorColor="secondary"
      >
        {tabs.map((tab, index) => (
          <AntTab key={index} label={tab.title} sx={{ fontWeight: 400 }} />
        ))}
      </AntTabs>

      {tabs.map((tab, index) => (
        <Box key={index} hidden={tabIndex !== index}>
          {tab.panel}
        </Box>
      ))}
    </Box>
  );
}
