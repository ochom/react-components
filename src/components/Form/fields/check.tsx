import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import React from "react";
import { FormField } from "../types";

const SwitchField = ({ field }: { field: FormField }) => {
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

const CheckBoxField = ({ field }: { field: FormField }) => {
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

const RadioGroupField = ({ field }: { field: FormField }) => {
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

export { CheckBoxField, RadioGroupField, SwitchField };
