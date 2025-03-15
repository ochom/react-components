import { ButtonProps } from "@mui/material";

export type FieldType =
  | "text"
  | "textarea"
  | "editor"
  | "email"
  | "password"
  | "number"
  | "date"
  | "datetime"
  | "date-range"
  | "datetime-range"
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
  xs?: number;
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

export interface SecondaryFormFieldProps {
  loading?: boolean;
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
  startText?: string;
  endText?: string;
}

export interface PrimaryFormFieldProps {
  name: string;
  label: string;
}

export interface ContainerFieldGrow {
  grow?: Grow;
}

export type FormField = PrimaryFormFieldProps & SecondaryFormFieldProps;

export type ContainerFormField = PrimaryFormFieldProps &
  SecondaryFormFieldProps &
  ContainerFieldGrow;

export interface FormProps {
  processing?: boolean;
  component?: "div" | "form";
  fields: ContainerFormField[];
  fieldSpacing?: number;
  useNativeLabels?: boolean;
  capitalizeLabels?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
