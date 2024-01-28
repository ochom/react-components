import {
  Autocomplete,
  ButtonProps,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment as Adapter } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { CButton, LButton } from "../Buttons";

import React, { useMemo } from "react";

import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { LoadingButtonProps } from "@mui/lab";

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "multiselect"
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
  min?: number;
  max?: number;
  minDate?: Date;
  maxDate?: Date;
  grow?: Grow;
}

interface FormProps {
  component?: "div" | "form";
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
  const selected = useMemo(() => {
    return field.options?.find((opt) => opt.value === field.value) ?? null;
  }, [field.value, field.options]);

  const handleChange = (e: any, newValue: SelectOption | null) =>
    field.onChange({
      target: { name: field.name, value: newValue?.value ?? "" },
    });

  return (
    <FormControl fullWidth>
      <Autocomplete
        id={`${field.name}-label`}
        autoHighlight
        value={selected}
        options={field?.options ?? []}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={field.label}
            required={field.required && !selected}
          />
        )}
        isOptionEqualToValue={(prev, next) => prev.value === next.value}
      />
    </FormControl>
  );
};

const MultiSelectField = (field: FormField) => {
  const selected = useMemo(() => {
    return (
      field.options?.filter((opt) => field.value.includes(opt.value)) ?? []
    );
  }, [field.value, field.options]);

  const handleChange = (e: any, newValue: SelectOption[]) => {
    field.onChange({
      target: { name: field.name, value: newValue.map((v) => v.value) },
    });
  };

  return (
    <FormControl fullWidth>
      <Autocomplete
        multiple
        id={`${field.name}-label`}
        options={field?.options ?? []}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        onChange={handleChange}
        isOptionEqualToValue={(prev, next) => prev.value === next.value}
        renderOption={(props, option) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected.map((s) => s.value).includes(option.value)}
            />
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={field.label}
            required={field.required && selected.length === 0}
            placeholder={field?.placeholder ?? ""}
          />
        )}
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
        required={field.required}
      >
        {(field?.options ?? []).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const DateField = (field: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DatePicker
          format="DD/MM/Y"
          label={field.label}
          value={moment(field.value)}
          minDate={field.minDate ? moment(field.minDate) : undefined}
          maxDate={field.maxDate ? moment(field.maxDate) : undefined}
          onChange={(newValue) => {
            field.onChange({ target: { name: field.name, value: newValue } });
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export const DateTimeField = (field: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DateTimePicker
          format="DD/MM/Y HH:mm"
          label={field.label}
          value={moment(field.value)}
          minDate={field.minDate ? moment(field.minDate) : undefined}
          maxDate={field.maxDate ? moment(field.maxDate) : undefined}
          onChange={(newValue) => {
            field.onChange({ target: { name: field.name, value: newValue } });
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export const DefaultField = ({ ...field }: FormField) => {
  const handleChange = (e: any) => {
    const value = e.target.value;

    // check if number field  and min and max are defined
    if (field.type === "number" && field.min !== undefined) {
      if (Number(value) < field.min) {
        e.target.value = field.min;
        return;
      }
    }

    if (field.type === "number" && field.max !== undefined) {
      if (Number(value) > field.max) {
        e.target.value = field.max;
        return;
      }
    }

    field.onChange(e);
  };

  return (
    <FormControl fullWidth>
      <TextField {...field} onChange={handleChange} />
    </FormControl>
  );
};

const CustomField = ({ ...field }: FormField) => {
  return <>{field.component}</>;
};

const FormFieldComponent = ({ field }: { field: FormField }) => {
  const fields: { [key in FieldType]: React.FC<FormField> } = {
    search: SearchField,
    select: SelectField,
    multiselect: MultiSelectField,
    date: DateField,
    datetime: DateTimeField,
    custom: CustomField,
    email: DefaultField,
    number: DefaultField,
    password: DefaultField,
    text: DefaultField,
  };

  const FieldComponent = fields[field.type] ?? DefaultField;
  const myField = <FieldComponent {...field} />;

  // define grow dimensions
  const xs = field.grow?.xs ?? 12;
  const sm = field.grow?.sm ?? xs;
  const md = field.grow?.md ?? sm;
  const lg = field.grow?.lg ?? md;

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      {myField}
    </Grid>
  );
};

const Container = ({ component, onSubmit, children }: any) => {
  if (component === "form") {
    return <form onSubmit={onSubmit}>{children}</form>;
  }
  return <div>{children}</div>;
};

export default function Form({
  component = "form",
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
    <Container component={component} onSubmit={onSubmit}>
      <Grid container spacing={fieldSpacing}>
        {fields.map((field, index) => {
          // check if the field's required prop is defined, if not set it to true
          if (field.required === undefined) field.required = true;
          if (field.hidden) return null;
          return <FormFieldComponent key={index} field={field} />;
        })}

        {showButtons && (
          <Grid item>
            <Stack direction="row" spacing={3} justifyContent="left">
              <LButton type="submit" {...submitButtonProps}>
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
    </Container>
  );
}
