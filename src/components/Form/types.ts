export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "select"
  | "custom";

export interface SelectOption {
  label: string;
  value: string;
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
}

export interface ButtonProps {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error";
}

export interface FormProps {
  processing?: boolean;
  fields: FormField[];
  onSubmit: () => void;
  onCancel?: () => void;
  submitText?: string;
  submitIcon?: React.ReactNode;
  cancelText?: string;
  submitIconPosition?: "start" | "end";
  showButtons?: boolean;
  showCancel?: boolean;
  showSubmitIcon?: boolean;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
