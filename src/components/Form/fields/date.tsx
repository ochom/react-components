import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";

import moment from "moment";

import { FormField } from "../properties";

const DateField = ({ field }: { field: FormField }) => {
  return (
    <DatePicker
      format={field?.format ?? "DD/MM/Y"}
      label={field.label}
      value={field.value ? moment(field.value) : undefined}
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
  );
};

const DateTimeField = ({ field }: { field: FormField }) => {
  return (
    <DateTimePicker
      format="DD/MM/Y HH:mm"
      label={field.label}
      value={field.value ? moment(field.value) : undefined}
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
  );
};

export { DateField, DateTimeField };
