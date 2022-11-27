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
import { FormField, FormProps } from "./types";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Save } from "@mui/icons-material";

interface loadingIconOptions {
  loading: boolean;
  loadingPosition: "start" | "end";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const SelectField = ({ ...field }: FormField) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
        <Select
          labelId={`${field.name}-label`}
          fullWidth
          id={field.name}
          {...field}
        >
          {(field.options || []).map((opt, i) => (
            <MenuItem key={i} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

const DateField = ({ ...field }: FormField) => {
  return (
    <Grid item xs={12}>
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
    </Grid>
  );
};

const CustomField = ({ ...field }: FormField) => {
  return (
    <Grid item xs={12}>
      {field.component}
    </Grid>
  );
};

const TextFieldComponent = ({ ...field }: FormField) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <TextField {...field} />
      </FormControl>
    </Grid>
  );
};

const FormFieldComponent = ({ field }: { field: FormField }) => {
  switch (field.type) {
    case "select":
      return <SelectField {...field} />;
    case "date":
      return <DateField {...field} />;
    case "custom":
      return <CustomField {...field} />;
    default:
      return <TextFieldComponent {...field} />;
  }
};

export default function Form({
  processing = false,
  fields = [],
  onSubmit = () => {},
  onCancel = () => {},
  submitIcon = <Save />,
  submitText = "Submit",
  cancelText = "Cancel",
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
          return <FormFieldComponent key={index} field={field} />;
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
