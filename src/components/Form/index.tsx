import { CButton, LButton } from "../Buttons";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment as Adapter } from "@mui/x-date-pickers/AdapterMoment";
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
import moment from "moment";
 

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

export const DateField =  ({ name, label, value, onChange }: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DatePicker
          label={label}
          value={moment(value)}
          format="DD/MM/Y"
          onChange={(date) => {
            const target = { name, value: date };
            onChange({ target });
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export const DateTimeField = ({ name, label, value, onChange }: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DateTimePicker
          label={label}
          value={moment(value)}
          format="DD/MM/Y HH:mm"
          onChange={(date) => {
            const target = { name, value: date };
            onChange({ target });
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
    case "datetime":
      myField = <DateTimeField {...field} />;
      break;
    case "custom":
      myField = <CustomField {...field} />;
      break;
    default:
      myField = <TextFieldComponent {...field} />;
      break;
  }

  // define grow dimensions
  const xs = field.grow?.xs || 12;
  const sm = field.grow?.sm || xs;
  const md = field.grow?.md || sm;
  const lg = field.grow?.lg || md;

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      {myField}
    </Grid>
  );
};

export default function Form({
  fields = [],
  fieldSpacing = 4,
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
      <Grid container spacing={fieldSpacing}>
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
