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

export default function Form(props: FormProps) {
  const {
    submitIcon = <Save />,
    submitText = "Submit",
    cancelText = "Cancel",
    processing = false,
    submitIconPosition = "start",
    showCancel = true,
    showSubmitIcon = true,
  } = props;

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
    <form onSubmit={props.onSubmit}>
      <Grid container spacing={4}>
        {props.fields.map((field, index) => {
          const {
            name,
            label,
            type,
            options,
            custom,
            required,
            placeholder,
            disabled,
            multiline,
            rows,
            hidden,
          } = field;
          if (hidden) return null;
          return (
            <Grid item key={index} xs={12}>
              {type === "select" ? (
                <FormControl fullWidth>
                  <InputLabel id={`${name}-label`}>{label}</InputLabel>
                  <Select
                    labelId={`${name}-label`}
                    fullWidth
                    id={name}
                    value={props.formData[name]}
                    onChange={props.onChange}
                    {...field}
                  >
                    {(options || []).map((opt, index) => (
                      <MenuItem key={index} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : type === "custom" ? (
                <FormControl fullWidth>{custom}</FormControl>
              ) : type === "date" ? (
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      value={props.formData[name]}
                      onChange={(value) =>
                        props.onChange({ target: { name, value: value["$d"] } })
                      }
                      {...field}
                    />
                  </LocalizationProvider>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id={name}
                    type={type}
                    label={label}
                    required={required}
                    name={name}
                    value={props.formData[name]}
                    onChange={props.onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    multiline={multiline}
                    rows={rows}
                  />
                </FormControl>
              )}
            </Grid>
          );
        })}

        <Grid item>
          <Stack direction="row" spacing={3} justifyContent="left">
            {showSubmitIcon ? (
              <LoadingButton
                type="submit"
                variant="contained"
                {...iconOptions}
                {...props.submitButtonProps}
              >
                {submitText}
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                {...props.submitButtonProps}
              >
                {submitText}
              </Button>
            )}
            {showCancel && (
              <Button
                onClick={props.onCancel}
                variant="outlined"
                {...props.cancelButtonProps}
              >
                {cancelText}
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
