import { Button, FormControl, Grid2 as Grid, Stack } from "@mui/material";
import React from "react";

import { CustomField, DefaultField, FileField } from "./fields/base";
import { CheckBoxField, RadioGroupField, SwitchField } from "./fields/check";
import { DateField, DateRangeField, DateTimeField } from "./fields/date";
import { MultiSelectField, SearchField, SelectField } from "./fields/select";
import { FormField, FormProps } from "./properties";

export const FormFieldComponent = ({ field }: { field: FormField }) => {
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
    default:
      return <DefaultField field={field} />;
  }
};

const Container = ({ component, onSubmit, children }: any) => {
  if (component === "form") {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit && onSubmit();
    };
    return <form onSubmit={(e) => handleSubmit(e)}>{children}</form>;
  }
  return <div>{children}</div>;
};

export default function Form({
  component = "form",
  fields = [],
  fieldSpacing = 4,
  onSubmit,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  submitButtonProps,
  cancelButtonProps,
}: FormProps) {
  const showButtons = onSubmit !== undefined || onCancel !== undefined;

  return (
    <Container component={component} onSubmit={onSubmit}>
      <Grid container spacing={fieldSpacing}>
        {fields.map((field, index) => {
          // check if the field's required prop is defined, if not set it to true by default
          field.required = field.required ?? true;

          // define grow dimensions
          const xs = field.grow?.xs || 12;
          const sm = field.grow?.sm || xs;
          const md = field.grow?.md || sm;
          const lg = field.grow?.lg || md;

          // early return for hidden field
          if (field.hidden) {
            return (
              <input
                type="hidden"
                name={field.name}
                value={field.value}
                hidden
              />
            );
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
              {onSubmit !== undefined && (
                <Button
                  type="submit"
                  variant="contained"
                  {...submitButtonProps}
                >
                  {submitText}
                </Button>
              )}
              {onCancel !== undefined && (
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
