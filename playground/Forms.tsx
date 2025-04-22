import { Container, Typography } from "@mui/material";
import { CDrawer, Form, muiConfirm, useForm, useModal } from "../src";

const initFormData = {
  name: "",
  email: "",
  password: "",
  date: "",
  datetime: "",
  dateRange: [],
  datetimeRange: [],
  switch: false,
  checkbox: false,
  radio: "",
  select: "",
  multiselect: [],
  search: "",
  editor: "",
  file: null,
  custom: "",
};

export default function Forms() {
  const [open, toggle] = useModal();
  const { createField, formData, setFormData } = useForm(initFormData);

  const handleConfirm = () => {
    muiConfirm({
      title: "Form Data",
      message: "Are you sure you want to submit this form?",
      onConfirm: () => {
        console.log(formData);
        toggle();
      },
      onCancel: () => console.log("Cancelled"),
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Form
        onSubmit={() => {
          console.log(formData);
          toggle();
        }}
        onCancel={() => handleConfirm()}
        useNativeLabels
        capitalizeLabels
        fieldSpacing={2}
        fields={[
          createField("name", "Name"),
          createField("email", "Email", { type: "email" }),
          createField("password", "Password", { type: "password" }),
          createField("select", "Select", {
            type: "select",
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 2", value: "option3" }, // on purpose to test option keys
            ],
            grow: { xs: 6, md: 4 },
          }),
          createField("multiselect", "MultiSelect", {
            type: "multiselect",
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ],
            grow: { xs: 6, md: 4 },
          }),
          createField("search", "Search", {
            type: "search",
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 2", value: "option3" }, // on purpose to test option keys
            ],
            grow: { xs: 6, md: 4 },
          }),
          createField("date", "Date", {
            type: "date",
            grow: { xs: 6 },
          }),
          createField("datetime", "DateTime", {
            type: "datetime",
            grow: { xs: 6 },
          }),
          createField("dateRange", "Date Range", {
            type: "date-range",
            grow: { xs: 6 },
          }),
          createField("datetimeRange", "Date Range", {
            type: "datetime-range",
            grow: { xs: 6 },
          }),
          createField("switch", "Switch", {
            type: "switch",
            grow: { xs: 4 },
          }),
          createField("checkbox", "Checkbox", {
            type: "checkbox",
            grow: { xs: 4 },
          }),
          createField("radio", "Radio", {
            type: "radio",
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
            ],
            grow: { xs: 4 },
          }),
          createField("file", "File", {
            type: "file",
            grow: { xs: 6 },
          }),

          createField("editor", "Editor", { type: "editor" }),
          createField("custom", "Custom", {
            type: "custom",
            component: (
              <input
                type="text"
                placeholder="Iam a custom component"
                value={formData.custom}
                onChange={(e) =>
                  setFormData({ ...formData, custom: e.target.value })
                }
              />
            ),
          }),
        ]}
      />

      <CDrawer open={open} setOpen={() => toggle()} title={"JSON Form Data"}>
        <Typography variant="h6">JSON Form Data</Typography>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </CDrawer>
    </Container>
  );
}
