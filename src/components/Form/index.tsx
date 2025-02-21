import {
  Button,
  FormControl,
  FormLabel,
  Grid2 as Grid,
  Stack,
} from "@mui/material";
import React, { ReactNode } from "react";

import { DefaultField, FileField } from "./fields/base";
import { CheckBoxField, RadioGroupField, SwitchField } from "./fields/check";
import {
  DateField,
  DateRangeField,
  DateTimeField,
  DateTimeRangeField,
} from "./fields/date";
import { MultiSelectField, SearchField, SelectField } from "./fields/select";
import { FormField, FormProps } from "./properties";

type CustomField = (props: { field: FormField }) => ReactNode;

export const FormFieldComponent = ({
  field,
  useNativeLabels,
}: {
  field: FormField;
  useNativeLabels: boolean;
}) => {
  const showNativeLabel =
    useNativeLabels &&
    field.type !== "checkbox" &&
    field.type !== "switch" &&
    field.type !== "radio";

  let customField: CustomField;

  switch (field.type) {
    case "search":
      customField = SearchField;
      break;
    case "select":
      customField = SelectField;
      break;
    case "multiselect":
      customField = MultiSelectField;
      break;
    case "date":
      customField = DateField;
      break;
    case "datetime":
      customField = DateTimeField;
      break;
    case "date-range":
      customField = DateRangeField;
      break;
    case "datetime-range":
      customField = DateTimeRangeField;
      break;
    case "switch":
      customField = SwitchField;
      break;
    case "checkbox":
      customField = CheckBoxField;
      break;
    case "radio":
      customField = RadioGroupField;
      break;
    case "file":
      customField = FileField;
      break;
    default:
      customField = DefaultField;
  }

  if (showNativeLabel) {
    const withoutLabel: FormField = { ...field };
    withoutLabel.label = "";
    return (
      <>
        <FormLabel
          htmlFor={field.name}
          required={field.required}
          sx={{ mb: 1 }}
        >
          {field.label}
        </FormLabel>
        {React.createElement(customField, { field: withoutLabel })}
      </>
    );
  }

  return React.createElement(customField, { field });
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
  processing = false,
  component = "form",
  fields = [],
  fieldSpacing = 4,
  useNativeLabels = false,
  capitalizeLabels = false,
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
          field.size = field.size ?? "small";

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

          if (field.type === "custom") {
            return (
              <Grid key={index} size={{ xs, sm, md, lg }}>
                {field.component}
              </Grid>
            );
          }

          if (capitalizeLabels) {
            field.label = field.label.toUpperCase();
          }

          return (
            <Grid key={index} size={{ xs, sm, md, lg }}>
              <FormControl fullWidth>
                <FormFieldComponent
                  field={field}
                  useNativeLabels={useNativeLabels}
                />
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
                  loading={processing}
                  {...submitButtonProps}
                >
                  {submitText}
                </Button>
              )}
              {onCancel !== undefined && (
                <Button
                  onClick={onCancel}
                  variant="outlined"
                  disabled={processing}
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
