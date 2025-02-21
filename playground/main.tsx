import { Icon } from "@iconify/react";
import {
  createTheme,
  CssBaseline,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  useColorScheme,
} from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { LicenseInfo } from "@mui/x-license-pro";
import { Tabs } from "ochom-react-components";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import EmptyPages from "./EmptyPages";
import Forms from "./Forms";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_X_LICENSE_KEY);

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: deepPurple[500],
        },
        secondary: {
          main: green[500],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: deepPurple[300],
        },
        secondary: {
          main: green[300],
        },
      },
    },
  },
});

const ModeToggler = () => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    console.log("Toggling theme, current mode is", mode);
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={toggleTheme}>
      <Icon
        icon={mode === "light" ? "bi:moon" : "bi:sun"}
        style={{ fontSize: "2rem" }}
      />
    </IconButton>
  );
};

const App = () => {
  const [index, setIndex] = useState(0);

  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />

      <Paper sx={{ p: 5 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
          sx={{ mb: 2 }}
        >
          <h1>Testing React Components</h1>
          <ModeToggler />
        </Stack>
        <Tabs
          index={index}
          setIndex={setIndex}
          tabs={[
            {
              title: "Empty Pages",
              panel: <EmptyPages />,
            },
            {
              title: "Forms",
              icon: <Icon icon="table:user" />,
              panel: <Forms />,
            },
          ]}
        />
      </Paper>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
