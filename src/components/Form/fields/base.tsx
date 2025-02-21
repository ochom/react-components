import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useId } from "react";
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
      onChange={handleChange}
    />
  );
};

const FileField = ({ field }: { field: FormField }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        py: 1.5,
        px: 2,
        border: "1px solid #ccc",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          top: "-10px",
          left: "10px",
          pb: 1,
          position: "absolute",
          backgroundColor: theme.palette.background.paper,
          padding: "0 5px",
        }}
      >
        {field.label}
      </Typography>
      <input
        type="file"
        id={field.name}
        name={field.name}
        accept={field?.accept ?? "*"}
        onChange={(e: any) => {
          field.onChange &&
            field.onChange({
              target: {
                name: field.name,
                value: e.target.files?.length ? e.target.files[0] : null,
              },
            });
        }}
      />
    </Box>
  );
};

export { DefaultField, FileField };
