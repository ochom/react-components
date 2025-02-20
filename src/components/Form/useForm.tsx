import { useState } from "react";
import { ContainerFieldGrow, SecondaryFormFieldProps } from "./types";

type CreateFieldType = SecondaryFormFieldProps & ContainerFieldGrow;

export const useForm = (initialState: { [key: string]: any } = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createField = (
    name: string,
    label: string,
    props?: CreateFieldType
  ) => {
    // create props if not defined
    let more: any = { name, label };
    if (props) {
      more = { ...props, ...more };
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

    more["value"] = more?.value ?? formData[name];
    more["onChange"] = more?.onChange ?? onChange;

    return {
      type: more?.type,
      name,
      label,
      ...more,
    };
  };

  return { createField, formData, setFormData, onChange };
};
