import {
  DatePicker,
  DateRangePicker,
  DateTimePicker,
  LocalizationProvider,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import { AdapterMoment as Adapter } from "@mui/x-date-pickers-pro/AdapterMoment";
import moment from "moment";
import React, { useEffect } from "react";

import { FormField } from "../properties";

export const DateField = ({ field }: { field: FormField }) => {
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

const DateTimeField = ({ field }: { field: FormField }) => {
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

const DateRangeField = ({ field }: { field: FormField }) => {
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
        value={value}
        minDate={field.minDate ? moment(field.minDate) : undefined}
        maxDate={field.maxDate ? moment(field.maxDate) : undefined}
        onChange={(newValue: [moment.Moment | null, moment.Moment | null]) => {
          field.onChange &&
            field.onChange({ target: { name: field.name, value: newValue } });
        }}
        slots={{ field: SingleInputDateRangeField }}
        name="allowedRange"
      />
    </LocalizationProvider>
  );
};

export { DateRangeField, DateTimeField };
