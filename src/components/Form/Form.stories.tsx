import type { Meta, StoryObj } from '@storybook/react';
import Form from './index';
import { useState } from 'react';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
      alert('Form submitted! Check console for data.');
    },
  },
};

export const AllFieldTypes: Story = {
  args: {
    fields: [
      { name: 'text', label: 'Text Field', type: 'text' },
      { name: 'email', label: 'Email Field', type: 'email' },
      { name: 'password', label: 'Password Field', type: 'password' },
      { name: 'number', label: 'Number Field', type: 'number' },
      { name: 'date', label: 'Date Field', type: 'date' },
      { name: 'datetime', label: 'DateTime Field', type: 'datetime' },
      {
        name: 'select',
        label: 'Select Field',
        type: 'select',
        options: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ],
      },
      {
        name: 'multiselect',
        label: 'Multi Select',
        type: 'multiselect',
        options: [
          { label: 'Tag 1', value: '1' },
          { label: 'Tag 2', value: '2' },
          { label: 'Tag 3', value: '3' },
        ],
      },
      { name: 'switch', label: 'Switch Field', type: 'switch' },
      { name: 'checkbox', label: 'Checkbox Field', type: 'checkbox' },
      {
        name: 'radio',
        label: 'Radio Group',
        type: 'radio',
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      },
      {
        name: 'textarea',
        label: 'Textarea',
        type: 'textarea',
        multiline: true,
        rows: 4,
      },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const WithValidation: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        required: true,
        min: 18,
        max: 100,
      },
      {
        name: 'bio',
        label: 'Bio',
        type: 'textarea',
        required: false,
        multiline: true,
        rows: 3,
      },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const ResponsiveGrid: Story = {
  args: {
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        grow: { xs: 12, sm: 6 },
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        grow: { xs: 12, sm: 6 },
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        grow: { xs: 12 },
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        grow: { xs: 12, sm: 6 },
      },
      {
        name: 'country',
        label: 'Country',
        type: 'select',
        grow: { xs: 12, sm: 6 },
        options: [
          { label: 'USA', value: 'us' },
          { label: 'UK', value: 'uk' },
          { label: 'Canada', value: 'ca' },
        ],
      },
      {
        name: 'address',
        label: 'Address',
        type: 'textarea',
        multiline: true,
        rows: 3,
        grow: { xs: 12 },
      },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const WithNativeLabels: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ],
      },
    ],
    useNativeLabels: true,
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const CapitalizedLabels: Story = {
  args: {
    fields: [
      { name: 'username', label: 'username', type: 'text' },
      { name: 'email', label: 'email address', type: 'email' },
      { name: 'fullname', label: 'full name', type: 'text' },
    ],
    capitalizeLabels: true,
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const WithCancelButton: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
      alert('Form submitted!');
    },
    onCancel: () => {
      alert('Form cancelled!');
    },
  },
};

export const CustomButtonText: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
    ],
    submitText: 'Register',
    cancelText: 'Reset',
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
    onCancel: () => console.log('Cancelled'),
  },
};

export const Processing: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
    ],
    processing: true,
    onSubmit: (e) => {
      e.preventDefault();
    },
  },
};

export const DisabledFields: Story = {
  args: {
    fields: [
      { name: 'username', label: 'Username', type: 'text', disabled: true, value: 'john_doe' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'role', label: 'Role', type: 'text', disabled: true, value: 'Admin' },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const FileUpload: Story = {
  args: {
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      {
        name: 'avatar',
        label: 'Avatar',
        type: 'file',
        accept: 'image/*',
      },
      {
        name: 'document',
        label: 'Document',
        type: 'file',
        accept: '.pdf,.doc,.docx',
      },
    ],
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
    },
  },
};

export const AsDiv: Story = {
  args: {
    component: 'div',
    fields: [
      { name: 'search', label: 'Search', type: 'text', placeholder: 'Search...' },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
    ],
  },
};

export const InteractiveWithHook = () => {
  const [model, setModel] = useState({
    username: '',
    email: '',
    bio: '',
  });

  const handleChange = (e: any) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Submitted model:', model);
    alert('Form submitted! Check console.');
  };

  return (
    <div>
      <Form
        fields={[
          {
            name: 'username',
            label: 'Username',
            type: 'text',
            value: model.username,
            onChange: handleChange,
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            value: model.email,
            onChange: handleChange,
          },
          {
            name: 'bio',
            label: 'Bio',
            type: 'textarea',
            multiline: true,
            rows: 4,
            value: model.bio,
            onChange: handleChange,
          },
        ]}
        onSubmit={handleSubmit}
      />
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h4>Current Form State:</h4>
        <pre>{JSON.stringify(model, null, 2)}</pre>
      </div>
    </div>
  );
};
