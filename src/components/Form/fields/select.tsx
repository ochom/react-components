import { Icon } from "@iconify/react";
import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material";
import { useMemo } from "react";

import { FormField, SelectOption } from "../properties";
import Loading from "./loading";

const SearchField = ({ field }: { field: FormField }) => {
  const handleChange = (_e: any, newValue: SelectOption | null) => {
    field.onChange &&
      field.onChange({
        target: { name: field.name, value: newValue?.value ?? "" },
      });
  };

  // remove duplicate options
  const cleanOptions = useMemo(() => {
    if (!field.options || field.options.length === 0) return [];

    const uniqueOptions = new Map<string, SelectOption>();
    field.options.forEach((option) => {
      if (!uniqueOptions.has(option.value)) {
        uniqueOptions.set(option.value, option);
      }
    });

    return Array.from(uniqueOptions.values());
  }, [field.options]);

  const selected = useMemo(() => {
    return cleanOptions.find((opt) => opt.value === field.value) ?? null;
  }, [field.value, field.options]);

  if (field.loading) return <Loading />;

  return (
    <Autocomplete
      id={`${field.name}-label`}
      autoHighlight
      size={field.size}
      value={selected}
      options={cleanOptions}
      onChange={handleChange}
      getOptionKey={(option) => option.value}
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

const MultiSelectField = ({ field }: { field: FormField }) => {
  const cleanOptions = useMemo(() => {
    if (!field.options || field.options.length === 0) return [];

    const uniqueOptions = new Map<string, SelectOption>();
    field.options.forEach((option) => {
      if (!uniqueOptions.has(option.value)) {
        uniqueOptions.set(option.value, option);
      }
    });

    return Array.from(uniqueOptions.values());
  }, [field.options, field.loading]);

  const values =
    cleanOptions?.filter((opt) => field.value?.includes(opt.value)) || [];

  const handleChange = (newValues: SelectOption[]) => {
    field.onChange &&
      field.onChange({
        target: {
          name: field.name,
          value: newValues.map((opt) => opt.value),
        },
      });
  };

  if (field.loading) return <Loading />;

  return (
    <Autocomplete
      multiple
      size={field.size}
      id={`${field.name}-label`}
      options={cleanOptions}
      disableCloseOnSelect
      value={values}
      limitTags={2}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(prev, next) => prev.value === next.value}
      onChange={(_e, newValues) => {
        handleChange(newValues);
      }}
      getOptionKey={(option) => option.value}
      renderOption={({ key, ...more }, option) => {
        return (
          <li key={key} {...more}>
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

export { MultiSelectField, SearchField };
