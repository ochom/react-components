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
import { Cancel, Save } from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormField, FormProps } from "./types";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LoadingButton } from "@mui/lab";
import React from "react";

interface loadingIconOptions {
  loading: boolean;
  loadingIconPosition: "start" | "end";
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

function CustomForm(props: FormProps) {
  const iconOptions: loadingIconOptions = {
    loading: props.processing || false,
    loadingIconPosition: props.submitIconPosition || "start",
  };

  if (props.submitIconPosition === "start") {
    iconOptions.startIcon = props.submitIcon || <Save />;
  } else if (props.submitIconPosition === "end") {
    iconOptions.endIcon = props.submitIcon || <Save />;
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
            {props.showSubmitIcon ? (
              <LoadingButton
                type="submit"
                variant="contained"
                {...iconOptions}
                {...props.submitButtonProps}
              >
                {props.submitText || "Submit"}
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                variant="contained"
                {...props.submitButtonProps}
              >
                {props.submitText || "Submit"}
              </Button>
            )}
            {props.showCancel && (
              <Button onClick={props.onCancel} {...props.cancelButtonProps}>
                {props.cancelText || "Cancel"}
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default CustomForm;
