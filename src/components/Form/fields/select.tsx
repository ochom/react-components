import { Icon } from "@iconify/react";
import {
  Autocomplete,
  Checkbox,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { Field, SelectOption } from "../types";
import Loading from "./loading";

const SelectField = ({ field }: { field: Field }) => {
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

const SearchField = ({ field }: { field: Field }) => {
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

export { MultiSelectField, SearchField, SelectField };
