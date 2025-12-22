# ochom-react-components

A collection of React components built with Material UI (MUI). This library provides ready-to-use, customizable components to speed up your React application development.

## Installation

```bash
npm install ochom-react-components
```

or

```bash
yarn add ochom-react-components
```

## Peer Dependencies

Make sure you have the following dependencies installed in your project:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Components

### Table

A powerful data table component with built-in search, pagination, and customizable columns.

#### Basic Usage

```tsx
import { Table } from 'ochom-react-components';

const columns = [
  { selector: 'name', name: 'Name' },
  { selector: 'email', name: 'Email' },
  { selector: 'role', name: 'Role' }
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
];

function MyTable() {
  return (
    <Table
      columns={columns}
      data={data}
      onSearch={(value) => console.log('Searching:', value)}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | required | Array of column definitions |
| `data` | `any[]` | required | Array of data rows |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `any` | - | Error object to display |
| `emptyMessage` | `string` | `"No data on this page"` | Message when no data |
| `onSearch` | `(value: string) => void` | - | Search handler |
| `buttons` | `ButtonProps[]` | `[]` | Action buttons above table |
| `onRowClicked` | `(row: any) => void` | - | Row click handler |
| `serverSide` | `boolean` | `false` | Enable server-side pagination |
| `onPaginationChange` | `(page: number, rowsPerPage: number) => void` | - | Pagination change handler |
| `paginationAlign` | `"start" \| "end"` | `"end"` | Pagination alignment |
| `containerProps` | `BoxProps` | `{}` | Props for container Box |
| `tableAreaProps` | `PaperProps` | `{}` | Props for table Paper |

#### Advanced Example

```tsx
<Table
  columns={columns}
  data={data}
  loading={isLoading}
  serverSide={true}
  onSearch={(value) => handleSearch(value)}
  onPaginationChange={(page, rowsPerPage) => {
    fetchData(page, rowsPerPage);
  }}
  buttons={[
    {
      title: 'Add User',
      onClick: () => setShowModal(true),
      variant: 'contained'
    }
  ]}
  onRowClicked={(row) => console.log('Clicked:', row)}
/>
```

### Form

A flexible form component with multiple field types and built-in validation support.

#### Basic Usage

```tsx
import { Form } from 'ochom-react-components';

const fields = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' }
];

function MyForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Register"
    />
  );
}
```

#### Field Types

- `text` - Text input
- `textarea` - Multiline text
- `email` - Email input
- `password` - Password input
- `number` - Number input
- `date` - Date picker
- `datetime` - DateTime picker
- `switch` - Toggle switch
- `checkbox` - Checkbox
- `radio` - Radio group
- `select` - Single select dropdown
- `multiselect` - Multi-select dropdown
- `search` - Searchable select
- `file` - File upload
- `custom` - Custom component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fields` | `ContainerFormField[]` | required | Array of field definitions |
| `processing` | `boolean` | `false` | Show loading state on submit |
| `component` | `"div" \| "form"` | `"form"` | Container type |
| `fieldSpacing` | `number` | `2` | Spacing between fields |
| `useNativeLabels` | `boolean` | `false` | Use separate labels |
| `capitalizeLabels` | `boolean` | `false` | Capitalize all labels |
| `onSubmit` | `(e?: any) => void` | - | Submit handler |
| `onCancel` | `(e?: any) => void` | - | Cancel handler |
| `submitText` | `string` | `"Save"` | Submit button text |
| `cancelText` | `string` | `"Cancel"` | Cancel button text |
| `submitButtonProps` | `ButtonProps` | - | Submit button props |
| `cancelButtonProps` | `ButtonProps` | - | Cancel button props |

#### Advanced Example

```tsx
const fields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    grow: { xs: 12, sm: 6 },
    required: true
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    grow: { xs: 12, sm: 6 },
    required: true
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    options: [
      { label: 'USA', value: 'us' },
      { label: 'UK', value: 'uk' },
      { label: 'Canada', value: 'ca' }
    ]
  },
  {
    name: 'bio',
    label: 'Bio',
    type: 'textarea',
    multiline: true,
    rows: 4
  },
  {
    name: 'subscribe',
    label: 'Subscribe to newsletter',
    type: 'checkbox'
  }
];

<Form
  fields={fields}
  processing={isSubmitting}
  onSubmit={handleSubmit}
  onCancel={() => navigate(-1)}
  useNativeLabels={true}
/>
```

### useForm Hook

Custom hook for managing form state:

```tsx
import { useForm } from 'ochom-react-components';

function MyComponent() {
  const { model, handleChange } = useForm({
    username: '',
    email: ''
  });

  return (
    <Form
      fields={[
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          value: model.username,
          onChange: handleChange
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          value: model.email,
          onChange: handleChange
        }
      ]}
      onSubmit={() => console.log(model)}
    />
  );
}
```

### Modal

A simple and customizable modal component.

#### Basic Usage

```tsx
import { Modal } from 'ochom-react-components';
import { DialogContent, DialogActions, Button } from '@mui/material';

function MyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="My Modal"
      >
        <DialogContent>
          <p>Modal content goes here</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Modal>
    </>
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Control modal visibility |
| `onClose` | `() => void` | - | Close handler |
| `title` | `React.ReactNode` | - | Modal title |
| `children` | `React.ReactNode` | required | Modal content |

#### useModal Hook

```tsx
import { useModal } from 'ochom-react-components';

function MyComponent() {
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={() => openModal({ data: 'some data' })}>
        Open Modal
      </Button>
      <Modal open={modal.open} onClose={closeModal} title="Example">
        <DialogContent>
          {modal.data && <p>Data: {modal.data}</p>}
        </DialogContent>
      </Modal>
    </>
  );
}
```

### Tabs

A tabbed interface component.

#### Basic Usage

```tsx
import { Tabs } from 'ochom-react-components';

const tabs = [
  {
    label: 'Profile',
    content: <div>Profile content</div>
  },
  {
    label: 'Settings',
    content: <div>Settings content</div>
  }
];

function MyTabs() {
  return <Tabs tabs={tabs} />;
}
```

### Stepper

A step-by-step navigation component.

#### Basic Usage

```tsx
import { Stepper } from 'ochom-react-components';

const steps = [
  {
    label: 'Personal Info',
    content: <PersonalInfoForm />
  },
  {
    label: 'Address',
    content: <AddressForm />
  },
  {
    label: 'Confirmation',
    content: <Confirmation />
  }
];

function MyStepper() {
  return <Stepper steps={steps} />;
}
```

### EmptyPage

A component to display when there's no content.

#### Basic Usage

```tsx
import { EmptyPage } from 'ochom-react-components';

function MyComponent() {
  return (
    <EmptyPage
      title="No Data"
      message="There are no items to display"
    />
  );
}
```

### Drawer

A side drawer component.

#### Basic Usage

```tsx
import { Drawer } from 'ochom-react-components';

function MyDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
    >
      <div>Drawer content</div>
    </Drawer>
  );
}
```

## Customization

All components are built with Material UI and support MUI's theming system. You can customize the appearance by wrapping your app with MUI's ThemeProvider:

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your components */}
    </ThemeProvider>
  );
}
```

## Storybook

This library includes Storybook for interactive component documentation and testing. To run Storybook locally:

```bash
npm run storybook
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any issues, please report them at: https://github.com/ochom/react-components/issues

## License

ISC

## Author

Richard Ochom

## Repository

https://github.com/ochom/react-components
