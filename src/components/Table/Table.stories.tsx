import type { Meta, StoryObj } from '@storybook/react';
import Table from './index';
import { Icon } from '@iconify/react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
];

const basicColumns = [
  { selector: 'name', name: 'Name' },
  { selector: 'email', name: 'Email' },
  { selector: 'role', name: 'Role' },
  { selector: 'status', name: 'Status' },
];

export const Basic: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
};

export const WithSearch: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    onSearch: (value) => console.log('Searching for:', value),
  },
};

export const WithButtons: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    buttons: [
      {
        title: 'Add User',
        variant: 'contained',
        onClick: () => alert('Add User clicked'),
      },
      {
        title: 'Export',
        variant: 'outlined',
        onClick: () => alert('Export clicked'),
      },
    ],
  },
};

export const WithCustomColumns: Story = {
  args: {
    columns: [
      { selector: 'name', name: 'Full Name' },
      {
        selector: (row: any) => row.email,
        name: 'Email Address',
      },
      {
        selector: (row: any) => (
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: row.status === 'Active' ? '#4caf50' : '#f44336',
            color: 'white',
            fontSize: '12px'
          }}>
            {row.status}
          </span>
        ),
        name: 'Status',
      },
      {
        selector: (row: any) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Icon
              icon="mdi:pencil"
              style={{ cursor: 'pointer' }}
              onClick={() => alert(`Edit ${row.name}`)}
            />
            <Icon
              icon="mdi:delete"
              style={{ cursor: 'pointer' }}
              onClick={() => alert(`Delete ${row.name}`)}
            />
          </div>
        ),
        name: 'Actions',
        button: true,
      },
    ],
    data: sampleData,
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: 'No users found',
  },
};

export const WithError: Story = {
  args: {
    columns: basicColumns,
    data: [],
    error: 'Failed to load data',
  },
};

export const ClickableRows: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    onRowClicked: (row) => alert(`Clicked on ${row.name}`),
  },
};

export const ServerSidePagination: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    serverSide: true,
    onPaginationChange: (page, rowsPerPage) => {
      console.log(`Page: ${page}, Rows per page: ${rowsPerPage}`);
    },
  },
};

export const FullFeatured: Story = {
  args: {
    columns: [
      { selector: 'name', name: 'Name' },
      { selector: 'email', name: 'Email' },
      { selector: 'role', name: 'Role' },
      {
        selector: (row: any) => (
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: row.status === 'Active' ? '#4caf50' : '#f44336',
            color: 'white',
            fontSize: '12px'
          }}>
            {row.status}
          </span>
        ),
        name: 'Status',
      },
    ],
    data: sampleData,
    onSearch: (value) => console.log('Searching:', value),
    buttons: [
      {
        title: 'Add User',
        variant: 'contained',
        onClick: () => alert('Add User'),
      },
    ],
    onRowClicked: (row) => console.log('Row clicked:', row),
  },
};
