import { useState } from "react";

export interface CreateFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  options?: { label: string; value: string }[];
  value: string;
  onChange: (e: any) => void;
}

export const useForm = (initialState: { [key: string]: any } = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createField = (
    name: string,
    label: string,
    more: any = {}
  ): CreateFieldProps => {
    // if type is not specified, default to text
    if (!more.type) {
      more.type = "text";
    }

    // if type is textarea, convert to text
    if (more?.type === "textarea") {
      more.type = "text";
      more.multiline = true;
      more.rows = more.rows ?? 2;
    }

    // if type is text and has options, convert to select
    if (more?.options?.length && more?.type === "text") {
      more.type = "select";
    }

    return {
      name,
      label,
      value: formData[name],
      onChange,
      ...more,
    };
  };

  return { createField, formData, setFormData, onChange };
};
