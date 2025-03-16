import Editor from "react-simple-wysiwyg";
import { FormField } from "../properties";

export default function EditorField({ field }: { field: FormField }) {
  const handleChange = (value: string) => {
    field.onChange && field.onChange({ target: { value, name: field.name } });
  };

  return (
    <Editor
      value={field.value}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
