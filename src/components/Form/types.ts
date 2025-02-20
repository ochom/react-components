import { ButtonProps } from "@mui/material";

export type FieldType =
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

export interface SelectOption {
  label: string;
  value: string;
}

export interface Grow {
  xs: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export interface ChangeEvent {
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

export interface FormProps {
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
