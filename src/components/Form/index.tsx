import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormProps } from "./types";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Save } from "@mui/icons-material";

interface loadingIconOptions {
  loading: boolean;
  loadingPosition: "start" | "end";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export default function Form({
  fields = [],
  onSubmit = () => {},
  onCancel = () => {},
  submitIcon = <Save />,
  submitText = "Submit",
  cancelText = "Cancel",
  processing = false,
  showButtons = true,
  submitIconPosition = "start",
  showCancel = true,
  showSubmitIcon = true,
  submitButtonProps = {},
  cancelButtonProps = {},
}: FormProps) {
  const iconOptions: loadingIconOptions = {
    loading: processing,
    loadingPosition: submitIconPosition,
  };

  if (iconOptions.loadingPosition === "start") {
    iconOptions.startIcon = submitIcon;
  } else if (iconOptions.loadingPosition === "end") {
    iconOptions.endIcon = submitIcon;
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        {fields.map((field, index) => {
          if (field.hidden) return null;
          return (
            <Grid item key={index} xs={12}>
              {field.type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel id={`${field.name}-label`}>
                    {field.label}
                  </InputLabel>
                  <Select
                    labelId={`${field.name}-label`}
                    fullWidth
                    id={field.name}
                    {...field}
                  >
                    {(field.options || []).map((opt, index) => (
                      <MenuItem key={index} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : field.type === "custom" ? (
                <FormControl fullWidth>{field.component}</FormControl>
              ) : field.type === "date" ? (
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      {...field}
                      onChange={(val: any) => {
                        field.onChange &&
                          field.onChange({
                            target: { value: val["$d"], name: field.name },
                          });
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <TextField fullWidth {...field} />
                </FormControl>
              )}
            </Grid>
          );
        })}

        {showButtons && (
          <Grid item>
            <Stack direction="row" spacing={3} justifyContent="left">
              {showSubmitIcon ? (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  {...iconOptions}
                  {...submitButtonProps}
                >
                  {submitText}
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  {...submitButtonProps}
                >
                  {submitText}
                </Button>
              )}
              {showCancel && (
                <Button
                  onClick={onCancel}
                  variant="outlined"
                  {...cancelButtonProps}
                >
                  {cancelText}
                </Button>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
