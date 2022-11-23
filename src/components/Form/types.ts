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
  options?: SelectOption[]; // for select
  custom?: React.ReactNode; // for custom
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
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (e: any) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  processing?: boolean;
  submitText?: string;
  submitIcon?: React.ReactNode;
  cancelText?: string;
  cancelIcon?: React.ReactNode;
  submitIconPosition?: "start" | "end";
  showCancel?: boolean;
  showSubmitIcon?: boolean;
  showCancelIcon?: boolean;
  submitButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
