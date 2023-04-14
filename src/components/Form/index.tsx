import { CButton, LButton } from "../Buttons";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment as Adapter } from "@mui/x-date-pickers/AdapterMoment";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment";

import React, { useEffect, useState } from "react";

import { ButtonProps } from "@mui/material";
import { LoadingButtonProps } from "@mui/lab";

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "search"
  | "custom";

interface SelectOption {
  label: string;
  value: string;
}

interface Grow {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

interface ChangeEvent {
  target: {
    name: string;
    value: any;
  };
}

interface FormField {
  name: string;
  label: string;
  type: FieldType;
  value: string;
  onChange: (e: ChangeEvent) => void;
  options?: SelectOption[]; // for select
  component?: React.ReactNode; // for custom
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  hidden?: boolean;
  grow?: Grow;
}

interface FormProps {
  fields: FormField[];
  fieldSpacing: number;
  onSubmit: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showButtons?: boolean;
  showCancelButton?: boolean;
  submitButtonProps?: LoadingButtonProps;
  cancelButtonProps?: ButtonProps;
}

export const SearchField = (field: FormField) => {
  const currentValue =
    field.options?.find((opt) => opt.value === field.value) || null;

  const [selected, setSelected] = useState<SelectOption | null>(currentValue);
  const [inputValue, setInputValue] = useState(currentValue?.label || "");

  // whenever the selected value changes, update the field value
  useEffect(() => {
    if (selected) {
      field.onChange({ target: { name: field.name, value: selected.value } });
    } else {
      field.onChange({ target: { name: field.name, value: "" } });
    }
  }, [selected]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        id={`${field.name}-label`}
        autoHighlight
        value={selected}
        inputValue={inputValue}
        options={field.options || []}
        onChange={(e, newValue) => setSelected(newValue)}
        onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => <TextField {...params} label={field.label} />}
        isOptionEqualToValue={(prev, next) => prev.value === next.value}
      />
    </FormControl>
  );
};

export const SelectField = (field: FormField) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
      <Select
        labelId={`${field.name}-label`}
        fullWidth
        id={field.name}
        name={field.name}
        value={field.value}
        label={field.label}
        onChange={(e) => {
          field.onChange({
            target: { name: field.name, value: e.target.value },
          });
        }}
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

export const DateField = ({ name, label, value, onChange }: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DatePicker
          label={label}
          value={moment(value)}
          format="DD/MM/Y"
          onChange={(newValue) => {
            onChange({ target: { name, value: newValue } });
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
          onChange={(newValue) => {
            onChange({ target: { name, value: newValue } });
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
    case "search":
      myField = <SearchField {...field} />;
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
