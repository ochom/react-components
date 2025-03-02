import { Icon } from "@iconify/react";
import {
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  useColorScheme,
} from "@mui/material";
import { deepPurple, grey, purple } from "@mui/material/colors";
import { LicenseInfo } from "@mui/x-license-pro";
import { ConfirmHost, Tabs } from "ochom-react-components";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import EmptyPages from "./EmptyPages";
import Forms from "./Forms";
import Tables from "./Tables";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_X_LICENSE_KEY);

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: purple,
        divider: purple[200],
        text: {
          primary: grey[900],
          secondary: grey[800],
        },
      },
    },
    dark: {
      palette: {
        primary: deepPurple,
        divider: deepPurple[700],
        background: {
          default: "#050937",
          paper: "#0b0f40",
        },
        text: {
          primary: "#fff",
          secondary: grey[500],
        },
      },
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        sx: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        sx: {
          textTransform: "none",
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
    <IconButton size="small" onClick={toggleTheme}>
      <Icon icon={mode === "light" ? "bi:moon" : "bi:sun"} />
    </IconButton>
  );
};

const App = () => {
  const [index, setIndex] = useState(0);

  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />

        <Container sx={{ py: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            sx={{ mb: 2 }}
          >
            <ModeToggler />
          </Stack>
          <Tabs
            index={index}
            setIndex={setIndex}
            tabs={[
              {
                title: "Empty Pages",
                icon: <Icon icon="icon-park-solid:web-page" />,
                panel: <EmptyPages />,
              },
              {
                title: "Forms",
                icon: <Icon icon="fluent:form-48-regular" />,
                panel: <Forms />,
              },
              {
                title: "Tables",
                icon: <Icon icon="mi:table" />,
                panel: <Tables />,
              },
            ]}
          />
        </Container>
        <ConfirmHost />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
