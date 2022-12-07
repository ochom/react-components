import { CButton, LButton } from "../Buttons";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FormField, FormProps } from "./types";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

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
  fields = [],
  onSubmit = () => {},
  onCancel = () => {},
  showButtons = true,
  showCancelButton = true,
  submitText = "Save",
  cancelText = "Cancel",
  submitButtonProps,
  cancelButtonProps,
}: FormProps) {
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
              <LButton {...submitButtonProps} type="submit">
                {submitText}
              </LButton>
              {showCancelButton && (
                <CButton
                  onClick={onCancel}
                  variant="outlined"
                  {...cancelButtonProps}
                >
                  {cancelText}
                </CButton>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
