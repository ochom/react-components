import type { Meta, StoryObj } from '@storybook/react';
import Modal from './modal';
import { useState } from 'react';
import { Button, DialogContent, DialogActions, Typography } from '@mui/material';
import Form from '../Form';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">
        <DialogContent>
          <Typography>This is a basic modal with a title and content.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Modal>
    </>
  );
};

export const WithoutTitle = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Custom Content
          </Typography>
          <Typography>
            This modal doesn't use the title prop. Instead, content is fully customized.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Modal>
    </>
  );
};

export const WithForm = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form data:', Object.fromEntries(formData));
    alert('User added!');
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add New User">
        <DialogContent>
          <Form
            fields={[
              { name: 'username', label: 'Username', type: 'text', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              {
                name: 'role',
                label: 'Role',
                type: 'select',
                options: [
                  { label: 'Admin', value: 'admin' },
                  { label: 'User', value: 'user' },
                  { label: 'Manager', value: 'manager' },
                ],
              },
            ]}
            onSubmit={handleSubmit}
            onCancel={() => setOpen(false)}
            submitText="Add User"
          />
        </DialogContent>
      </Modal>
    </>
  );
};

export const ConfirmationDialog = () => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    alert('Item deleted!');
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm Delete">
        <DialogContent>
          <Typography>
            Are you sure you want to delete this item? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Modal>
    </>
  );
};

export const LongContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Long Content
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Terms and Conditions">
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            1. Introduction
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="h6" gutterBottom>
            2. User Agreement
          </Typography>
          <Typography paragraph>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </Typography>
          <Typography variant="h6" gutterBottom>
            3. Privacy Policy
          </Typography>
          <Typography paragraph>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.
          </Typography>
          <Typography variant="h6" gutterBottom>
            4. Disclaimer
          </Typography>
          <Typography paragraph>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Typography>
          <Typography variant="h6" gutterBottom>
            5. Additional Terms
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Decline</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Accept
          </Button>
        </DialogActions>
      </Modal>
    </>
  );
};

export const MultipleActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Save Changes">
        <DialogContent>
          <Typography>You have unsaved changes. What would you like to do?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Discard</Button>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Save as Draft
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Save & Publish
          </Button>
        </DialogActions>
      </Modal>
    </>
  );
};

export const NestedModals = () => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setFirstOpen(true)}>
        Open First Modal
      </Button>
      <Modal open={firstOpen} onClose={() => setFirstOpen(false)} title="First Modal">
        <DialogContent>
          <Typography paragraph>This is the first modal.</Typography>
          <Button variant="outlined" onClick={() => setSecondOpen(true)}>
            Open Second Modal
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFirstOpen(false)}>Close</Button>
        </DialogActions>
      </Modal>
      <Modal open={secondOpen} onClose={() => setSecondOpen(false)} title="Second Modal">
        <DialogContent>
          <Typography>This is a nested modal!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSecondOpen(false)}>Close</Button>
        </DialogActions>
      </Modal>
    </>
  );
};

export const WithCustomStyling = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Styled Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={
          <div style={{ backgroundColor: '#1976d2', color: 'white', padding: '16px', margin: '-20px -24px 16px' }}>
            Custom Styled Title
          </div>
        }
      >
        <DialogContent>
          <Typography>This modal has custom styling applied to its title.</Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#f5f5f5', margin: '16px -24px -20px', padding: '16px 24px' }}>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Modal>
    </>
  );
};
