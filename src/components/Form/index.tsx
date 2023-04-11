import { CButton, LButton } from "../Buttons";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment as Adapter } from "@mui/x-date-pickers/AdapterMoment";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FormField, FormProps } from "./types";
import moment from "moment";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  max-height: 150px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0 5px 5px 0px #888888;
  border-radius: 5px;
  overflow-y: hidden;
  display: none;
  &.show {
    display: block;
  }
`;

const SearchBoxItem = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #eee;
  }
`;

export const SelectSearchField = ({
  name,
  label,
  value,
  onChange = () => {},
  options = [],
  required = true,
  placeholder = "Search",
}: FormField) => {
  const selectSearchRef = useRef<any>(null);
  const searchBoxRef = useRef<any>(null);
  const currentValue = useRef(value);

  const [showSearchBox, setShowSearchBox] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (search) {
      const filtered = options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [search, options]);

  // on focusing the select search field, show the search box
  useEffect(() => {
    const input = selectSearchRef.current?.querySelector("input");

    const handleFocus = () => {
      setSearch("");
      currentValue.current = "";
      handleChange("");
      setShowSearchBox(true);
    };

    const handleClick = (e: any) => {
      // if the clicked element is the select search field, do nothing
      if (e.target === input) return;

      // if the clicked item is the SearchBox items, use the values
      if (searchBoxRef.current && searchBoxRef.current.contains(e.target)) {
        const { value: newValue, label } = e.target.dataset;
        setSearch(label);
        currentValue.current = newValue;
        handleChange(newValue);
        setShowSearchBox(false);
        return;
      }

      // when we click outside and the value is empty, reset search
      if (!currentValue.current) {
        setSearch("");
      }
      setShowSearchBox(false);
    };

    input.addEventListener("focus", handleFocus);
    document.addEventListener("click", handleClick);
    return () => {
      input.removeEventListener("focus", handleFocus);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (newValue: string) => {
    onChange({ target: { name, value: newValue } });
  };

  return (
    <SearchContainer>
      <TextField
        ref={selectSearchRef}
        fullWidth
        name={name}
        label={label}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
      />

      <SearchBox ref={searchBoxRef} className={showSearchBox ? "show" : ""}>
        {filteredOptions.map((o) => (
          <SearchBoxItem
            key={o.value}
            data-value={o.value}
            data-label={o.label}
          >
            {o.label}
          </SearchBoxItem>
        ))}
        {filteredOptions.length === 0 && (
          <SearchBoxItem data-value="" data-label="">
            {`No '${search}' found`}
          </SearchBoxItem>
        )}
      </SearchBox>
    </SearchContainer>
  );
};

export const SelectField = ({ ...field }: FormField) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
      <Select
        labelId={`${field.name}-label`}
        fullWidth
        id={field.name}
        {...field}
      >
        {(field.options || []).map((opt, i) => (
          <MenuItem key={i} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const DateField = ({ name, label, value, onChange }: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DatePicker
          label={label}
          value={moment(value)}
          format="DD/MM/Y"
          onChange={(date) => {
            const target = { name, value: date };
            onChange({ target });
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export const DateTimeField = ({ name, label, value, onChange }: FormField) => {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={Adapter}>
        <DateTimePicker
          label={label}
          value={moment(value)}
          format="DD/MM/Y HH:mm"
          onChange={(date) => {
            const target = { name, value: date };
            onChange({ target });
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export const TextFieldComponent = ({ ...field }: FormField) => {
  return (
    <FormControl fullWidth>
      <TextField {...field} />
    </FormControl>
  );
};

const CustomField = ({ ...field }: FormField) => {
  return <>{field.component}</>;
};

const FormFieldComponent = ({ field }: { field: FormField }) => {
  let myField = null;
  switch (field.type) {
    case "select":
      myField = <SelectField {...field} />;
      break;
    case "date":
      myField = <DateField {...field} />;
      break;
    case "datetime":
      myField = <DateTimeField {...field} />;
      break;
    case "custom":
      myField = <CustomField {...field} />;
      break;
    default:
      myField = <TextFieldComponent {...field} />;
      break;
  }

  // define grow dimensions
  const xs = field.grow?.xs || 12;
  const sm = field.grow?.sm || xs;
  const md = field.grow?.md || sm;
  const lg = field.grow?.lg || md;

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      {myField}
    </Grid>
  );
};

export default function Form({
  fields = [],
  fieldSpacing = 4,
  onSubmit = () => {},
  onCancel = () => {},
  showButtons = true,
  showCancelButton = true,
  submitText = "Save",
  cancelText = "Cancel",
  submitButtonProps,
  cancelButtonProps,
}: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={fieldSpacing}>
        {fields.map((field, index) => {
          if (field.hidden) return null;
          return <FormFieldComponent key={index} field={field} />;
        })}

        {showButtons && (
          <Grid item>
            <Stack direction="row" spacing={3} justifyContent="left">
              <LButton {...submitButtonProps} type="submit">
                {submitText}
              </LButton>
              {showCancelButton && (
                <CButton
                  onClick={onCancel}
                  variant="outlined"
                  {...cancelButtonProps}
                >
                  {cancelText}
                </CButton>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
