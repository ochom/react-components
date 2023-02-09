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

export const SelectField = ({ ...field }: FormField) => {
  return (
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
  );
};

export const DateField = ({ ...field }: FormField) => {
  return (
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
  );
};

export const TextFieldComponent = ({ ...field }: FormField) => {
  return (
    <FormControl fullWidth>
      <TextField {...field} />
    </FormControl>
  );
};

const CustomField = ({ ...field }: FormField) => {
  return <>{field.component}</>;
};

const FormFieldComponent = ({ field }: { field: FormField }) => {
  let myField = null;
  switch (field.type) {
    case "select":
      myField = <SelectField {...field} />;
      break;
    case "date":
      myField = <DateField {...field} />;
      break;
    case "custom":
      myField = <CustomField {...field} />;
      break;
    default:
      myField = <TextFieldComponent {...field} />;
      break;
  }

  const grow = field.grow || { xs: 12, sm: 12, md: 12, lg: 12 };

  return (
    <Grid
      item
      xs={grow.xs || 12}
      sm={grow.sm || 12}
      md={grow.md || 12}
      lg={grow.lg || 12}
    >
      {myField}
    </Grid>
  );
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
