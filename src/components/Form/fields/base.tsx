import { Button, Stack, TextField, Typography } from "@mui/material";
import { useId, useState } from "react";
import { FormField } from "../properties";

const DefaultField = ({ field }: { field: FormField }) => {
  const inputId = useId();
  const handleChange = (e: any) => {
    const value = e.target.value;

    // check if number field  and min and max are defined
    if (field.type === "number" && field.min !== undefined) {
      if (Number(value) < field.min) {
        e.target.value = field.min;
        return;
      }
    }

    if (field.type === "number" && field.max !== undefined) {
      if (Number(value) > field.max) {
        e.target.value = field.max;
        return;
      }
    }

    field.onChange && field.onChange(e);
  };

  return (
    <TextField
      id={inputId}
      type={field.type}
      name={field.name}
      label={field.label}
      value={field.value}
      size={field.size}
      multiline={field.multiline}
      rows={field.rows}
      required={field.required}
      disabled={field.disabled}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      onChange={handleChange}
    />
  );
};

const FileField = ({ field }: { field: FormField }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <Stack direction={"row"} spacing={3} alignItems={"center"}>
      <Button
        size={field.size}
        variant="outlined"
        component="label"
        sx={{
          display: "block",
          textAlign: "center",
        }}
      >
        Upload file
        <input
          type="file"
          accept={field.accept ?? "*"}
          hidden
          onChange={(e: any) => {
            setSelectedFile(e.target.files[0]);
            field.onChange &&
              field.onChange({
                target: {
                  name: field.name,
                  value: e.target.files?.length ? e.target.files[0] : null,
                },
              });
          }}
        />
      </Button>
      <Typography sx={{ flex: 1 }}>
        {selectedFile && selectedFile?.name}
      </Typography>
    </Stack>
  );
};

export { DefaultField, FileField };
