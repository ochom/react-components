import {
  DateRangePicker,
  SingleInputDateRangeField,
  SingleInputDateTimeRangeField,
} from "@mui/x-date-pickers-pro";

import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";

import moment from "moment";
import React, { useEffect } from "react";

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

const DateRangeField = ({ field }: { field: FormField }) => {
  const [value, setValue] = React.useState<
    [moment.Moment | null, moment.Moment | null]
  >([null, null]);

  useEffect(() => {
    try {
      if (!Array.isArray(field.value)) {
        throw new Error("Invalid date range, should be an array");
      }

      if (field.value.length !== 2) {
        throw new Error("Invalid date range, should be an array of 2 dates");
      }

      const startDate = moment(field.value[0]);
      const endDate = moment(field.value[1]);

      if (!startDate.isValid()) {
        throw new Error("Invalid start date");
      }

      if (!endDate.isValid()) {
        throw new Error("Invalid end date");
      }

      setValue([startDate, endDate]);
    } catch (error) {
      console.log("Invalid value for DateRangeField:", error);
    }
  }, [field.value]);

  return (
    <DateRangePicker
      format={field?.format ?? "DD/MM/Y"}
      value={value}
      label={field.label}
      minDate={field.minDate ? moment(field.minDate) : undefined}
      maxDate={field.maxDate ? moment(field.maxDate) : undefined}
      onChange={(newValue: [moment.Moment | null, moment.Moment | null]) => {
        field.onChange &&
          field.onChange({ target: { name: field.name, value: newValue } });
      }}
      slots={{
        field: SingleInputDateRangeField,
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

const DateTimeRangeField = ({ field }: { field: FormField }) => {
  const [value, setValue] = React.useState<
    [moment.Moment | null, moment.Moment | null]
  >([null, null]);

  useEffect(() => {
    try {
      if (!Array.isArray(field.value)) {
        throw new Error("Invalid date range, should be an array");
      }

      if (field.value.length !== 2) {
        throw new Error("Invalid date range, should be an array of 2 dates");
      }

      const startDate = moment(field.value[0]);
      const endDate = moment(field.value[1]);

      if (!startDate.isValid()) {
        throw new Error("Invalid start date");
      }

      if (!endDate.isValid()) {
        throw new Error("Invalid end date");
      }

      setValue([startDate, endDate]);
    } catch (error) {
      console.log("Invalid value for DateTimeRangeField:", error);
    }
  }, [field.value]);

  return (
    <SingleInputDateTimeRangeField
      label={field.label}
      value={value}
      format="DD/MM/Y HH:mm"
      minDate={field.minDate ? moment(field.minDate) : undefined}
      maxDate={field.maxDate ? moment(field.maxDate) : undefined}
      onChange={(newValue: [moment.Moment | null, moment.Moment | null]) => {
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

export { DateField, DateRangeField, DateTimeField, DateTimeRangeField };
