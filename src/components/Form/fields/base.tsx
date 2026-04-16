import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useId, useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { FormField } from "../properties";

const DefaultField = ({ field }: { field: FormField }) => {
  const [show, setShow] = useState(false);
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
      type={field.type === "password" && !show ? "password" : "text"}
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
      slotProps={{
        input: {
          endAdornment:
            field.type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShow((prev) => !prev)}
                  aria-label={show ? "Hide password" : "Show password"}
                  edge="end"
                >
                  <Icon icon={show ? "mdi:eye-off" : "mdi:eye"} />
                </IconButton>
              </InputAdornment>
            ) : undefined,
        },
      }}
    />
  );
};

const NumberField = ({ field }: { field: FormField }) => {
  const inputId = useId();
  const handleChange = (e: any) => {
    const value = e.target.value;

    // check if number field  and min and max are defined
    if (field.min !== undefined) {
      if (Number(value) < field.min) {
        e.target.value = field.min;
        return;
      }
    }

    if (field.max !== undefined) {
      if (Number(value) > field.max) {
        e.target.value = field.max;
        return;
      }
    }

    field.onChange?.({
      target: {
        name: field.name,
        value: e.target.value.replace(",", ""),
      },
    });
  };

  return (
    <NumericFormat
      id={inputId}
      name={field.name}
      label={field.label}
      value={field.value}
      customInput={TextField}
      size={field.size}
      required={field.required}
      disabled={field.disabled}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      onChange={handleChange}
      valueIsNumericString
      thousandSeparator
    />
  );
};

const PhoneNumberField = ({ field }: { field: FormField }) => {
  const inputId = useId();
  const handleChange = (e: any) => {
    field.onChange?.(e);
  };

  return (
    <PatternFormat
      id={inputId}
      name={field.name}
      label={field.label}
      value={field.value}
      customInput={TextField}
      size={field.size}
      required={field.required}
      disabled={field.disabled}
      placeholder={field.placeholder || "+254 (701) 234-567"}
      autoComplete={field.autoComplete}
      onChange={handleChange}
      format={field.format || "+254 (###) ##-####"}
      allowEmptyFormatting
      mask={"_"}
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

export { DefaultField, NumberField, PhoneNumberField, FileField };
