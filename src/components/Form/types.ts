import { ButtonProps } from "@mui/material";
import { LoadingButtonProps } from "@mui/lab";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "custom";

export interface SelectOption {
  label: string;
  value: string;
}

export interface Grow {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  value: string;
  onChange: (val: any) => void;
  options?: SelectOption[]; // for select
  component?: React.ReactNode; // for custom
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  hidden?: boolean;
  grow?: Grow;
}

export interface FormProps {
  fields: FormField[];
  fieldSpacing: number;
  onSubmit: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  showButtons?: boolean;
  showCancelButton?: boolean;
  submitButtonProps?: LoadingButtonProps;
  cancelButtonProps?: ButtonProps;
}
