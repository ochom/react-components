import { Icon } from "@iconify/react";
import {
  Autocomplete,
  Box,
  Button,
  ButtonProps,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment as Adapter } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, { useEffect, useId, useMemo, useState } from "react";

import DateRangePicker from "@mui/lab/DateRangePicker";

type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "number"
  | "date"
  | "datetime"
  | "date-range"
  | "switch"
  | "checkbox"
  | "radio"
  | "select"
  | "multiselect"
  | "search"
  | "file"
  | "custom";

interface SelectOption {
  label: string;
  value: string;
}

interface Grow {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
}

interface ChangeEvent {
  target: {
    name: string;
    value: any;
  };
}

export interface FormFieldProps {
  value?: string;
  type?: FieldType;
  multiline?: boolean;
  rows?: number;
  options?: SelectOption[];
  accept?: string;
  onChange?: (e: ChangeEvent) => void;
  component?: React.ReactNode; // for custom
  size?: "small" | "medium";
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  min?: number;
  max?: number;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  grow?: Grow;
  startText?: string;
  endText?: string;
}

export interface FormField {
  loading?: boolean;
  name: string;
  label: string;
}

export type Field = FormField & FormFieldProps;

interface FormProps {
  component?: "div" | "form";
  fields: Field[];
  fieldSpacing?: number;
  onSubmit: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showButtons?: boolean;
  showCancelButton?: boolean;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
};

export const SearchField = ({ field }: { field: Field }) => {
  const selected = useMemo(() => {
    return field.options?.find((opt) => opt.value === field.value) ?? null;
  }, [field.value, field.options]);

  const handleChange = (e: any, newValue: SelectOption | null) => {
    field.onChange &&
      field.onChange({
        target: { name: field.name, value: newValue?.value ?? "" },
      });
  };

  if (field.loading) return <Loading />;

  return (
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
  );
};

const MultiSelectField = ({ field }: { field: Field }) => {
  const [values, setValues] = useState<SelectOption[]>([]);

  useEffect(() => {
    const currentValues = [];
    for (const option of field?.options ?? []) {
      if (field.value && field.value.includes(option.value)) {
        currentValues.push(option);
      }
    }
    setValues(currentValues);
  }, []);

  useEffect(() => {
    field.onChange &&
      field.onChange({
        target: {
          name: field.name,
          value: values.map((opt) => opt.value),
        },
      });
  }, [values]);

  if (field.loading) return <Loading />;

  return (
    <Autocomplete
      multiple
      id={`${field.name}-label`}
      options={field?.options ?? []}
      disableCloseOnSelect
      value={values}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(prev, next) => prev.value === next.value}
      onChange={(e, newValues) => setValues(newValues)}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Checkbox
              icon={<Icon icon="mdi:checkbox-blank-outline" />}
              checkedIcon={<Icon icon="mdi:checkbox-marked" />}
              style={{ marginRight: 8 }}
              checked={values.map((s) => s.value).includes(option.value)}
            />
            {option.label}
          </li>
        );
      }}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.value}
            label={option.label}
          />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={field.label}
          required={field.required && values.length === 0}
          placeholder={field?.placeholder ?? ""}
        />
      )}
    />
  );
};

export const SelectField = ({ field }: { field: Field }) => {
  if (field.loading) return <Loading />;
  return (
    <>
      <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
      <Select
        labelId={`${field.name}-label`}
        fullWidth
        id={field.name}
        name={field.name}
        value={field.value}
        label={field.label}
        onChange={(e: any) => {
          field.onChange &&
            field.onChange({
              target: { name: field.name, value: e.target.value },
            });
        }}
        size={field.size}
        required={field.required}
      >
        {(field?.options ?? []).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export const DateField = ({ field }: { field: Field }) => {
  return (
    <LocalizationProvider dateAdapter={Adapter}>
      <DatePicker
        format={field?.format ?? "DD/MM/Y"}
        label={field.label}
        value={moment(field.value)}
        minDate={field.minDate ? moment(field.minDate) : undefined}
        maxDate={field.maxDate ? moment(field.maxDate) : undefined}
        onChange={(newValue) => {
          field.onChange &&
            field.onChange({ target: { name: field.name, value: newValue } });
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            required: field.required,
            size: field.size,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export const DateTimeField = ({ field }: { field: Field }) => {
  return (
    <LocalizationProvider dateAdapter={Adapter}>
      <DateTimePicker
        format="DD/MM/Y HH:mm"
        label={field.label}
        value={moment(field.value)}
        minDate={field.minDate ? moment(field.minDate) : undefined}
        maxDate={field.maxDate ? moment(field.maxDate) : undefined}
        onChange={(newValue) => {
          field.onChange &&
            field.onChange({ target: { name: field.name, value: newValue } });
        }}
      />
    </LocalizationProvider>
  );
};

export const DateRangeField = ({ field }: { field: Field }) => {
  const [value, setValue] = React.useState<
    [moment.Moment | null, moment.Moment | null]
  >([null, null]);

  useEffect(() => {
    try {
      if (Array.isArray(field.value) && field.value.length === 2) {
        const startDate = moment(field.value[0]);
        const endDate = moment(field.value[1]);
        if (startDate.isValid() && endDate.isValid()) {
          setValue([startDate, endDate]);
        } else {
          throw new Error("Invalid date range, should be an array of 2 dates");
        }
      } else {
        throw new Error("Invalid date range, should be an array of 2 dates");
      }
    } catch (error) {
      console.log("Invalid value for DateRangeField:", error);
    }
  }, [field.value]);

  return (
    <LocalizationProvider dateAdapter={Adapter}>
      <DateRangePicker
        format={field?.format ?? "DD/MM/Y"}
        startText={field.startText ?? "Start"}
        endText={field.endText ?? "End"}
        value={value}
        minDate={field.minDate ? moment(field.minDate) : undefined}
        maxDate={field.maxDate ? moment(field.maxDate) : undefined}
        onChange={(newValue: [moment.Moment | null, moment.Moment | null]) => {
          field.onChange &&
            field.onChange({ target: { name: field.name, value: newValue } });
        }}
        renderInput={(startProps: any, endProps: any) => (
          <>
            <TextField {...startProps} label={`${field.label} Start`} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} label={`${field.label} End`} />
          </>
        )}
      />
    </LocalizationProvider>
  );
};

export const SwitchField = ({ field }: { field: Field }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={Boolean(field.value)}
          onChange={(e: any) => {
            field.onChange &&
              field.onChange({
                target: { name: field.name, value: e.target.checked },
              });
          }}
        />
      }
      label={field.label}
    />
  );
};

export const CheckBoxField = ({ field }: { field: Field }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={Boolean(field.value)}
          onChange={(e: any) => {
            field.onChange &&
              field.onChange({
                target: { name: field.name, value: e.target.checked },
              });
          }}
        />
      }
      label={field.label}
    />
  );
};

export const RadioGroupField = ({ field }: { field: Field }) => {
  return (
    <>
      <FormLabel id={`${field.name}-label`}>{field.label}</FormLabel>
      <RadioGroup
        row
        aria-label={field.label}
        name={field.name}
        value={field.value}
        onChange={(e: any) => {
          field.onChange &&
            field.onChange({
              target: { name: field.name, value: e.target.value },
            });
        }}
      >
        {(field?.options ?? []).map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </>
  );
};

export const DefaultField = ({ field }: { field: Field }) => {
  const inputId = useId();
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

    field.onChange && field.onChange(e);
  };

  return (
    <TextField
      id={inputId}
      type={field.type}
      name={field.name}
      label={field.label}
      value={field.value}
      size={field.size}
      multiline={field.multiline}
      rows={field.rows}
      required={field.required}
      disabled={field.disabled}
      placeholder={field.placeholder}
      onChange={handleChange}
    />
  );
};

export const FileField = ({ field }: { field: Field }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        py: 1.5,
        px: 2,
        border: "1px solid #ccc",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          top: "-10px",
          left: "10px",
          pb: 1,
          position: "absolute",
          backgroundColor: theme.palette.background.paper,
          padding: "0 5px",
        }}
      >
        {field.label}
      </Typography>
      <input
        type="file"
        id={field.name}
        name={field.name}
        accept={field?.accept ?? "*"}
        onChange={(e: any) => {
          field.onChange &&
            field.onChange({
              target: {
                name: field.name,
                value: e.target.files?.length ? e.target.files[0] : null,
              },
            });
        }}
      />
    </Box>
  );
};

const CustomField = ({ field }: { field: Field }) => {
  return field.component;
};

const FormFieldComponent = ({ field }: { field: Field }) => {
  switch (field.type) {
    case "search":
      return <SearchField field={field} />;
    case "select":
      return <SelectField field={field} />;
    case "multiselect":
      return <MultiSelectField field={field} />;
    case "date":
      return <DateField field={field} />;
    case "datetime":
      return <DateTimeField field={field} />;
    case "date-range":
      return <DateRangeField field={field} />;
    case "switch":
      return <SwitchField field={field} />;
    case "checkbox":
      return <CheckBoxField field={field} />;
    case "radio":
      return <RadioGroupField field={field} />;
    case "file":
      return <FileField field={field} />;
    case "custom":
      return <CustomField field={field} />;
    case "email":
    case "number":
    case "password":
    case "text":
    default:
      return <DefaultField field={field} />;
  }
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

          // define grow dimensions
          const xs = field.grow?.xs || 12;
          const sm = field.grow?.sm || xs;
          const md = field.grow?.md || sm;
          const lg = field.grow?.lg || md;

          delete field.grow;

          // early return for hidden field
          if (field.hidden) {
            <Grid key={index} size={{ xs, sm, md, lg }}>
              <input type="hidden" name={field.name} value={field.value} />
            </Grid>;
          }

          return (
            <Grid key={index} size={{ xs, sm, md, lg }}>
              <FormControl fullWidth>
                <FormFieldComponent field={field} />
              </FormControl>
            </Grid>
          );
        })}

        {showButtons && (
          <Grid>
            <Stack direction="row" spacing={3} justifyContent="left">
              <Button type="submit" variant="contained" {...submitButtonProps}>
                {submitText}
              </Button>
              {showCancelButton && (
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
    </Container>
  );
}
