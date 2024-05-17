import { useState } from "react";
import { CreateFieldProps, FormField } from ".";

export const useForm = (initialState: { [key: string]: any } = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createField = (
    name: string,
    label: string,
    more?: CreateFieldProps
  ): FormField => {
    if (!more) {
      more = {};
    }

    // if type is not specified, default to text
    if (!more?.type) {
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
      type: more?.type,
      name,
      label,
      ...more,
      value: more?.value ?? formData[name],
      onChange: more?.onChange ?? onChange,
    };
  };

  return { createField, formData, setFormData, onChange };
};
