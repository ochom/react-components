import type { Meta, StoryObj } from '@storybook/react';
import { CDrawer } from './drawer';
import { useState } from 'react';
import { Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import Form from '../Form';

const meta: Meta<typeof CDrawer> = {
  title: 'Components/Drawer',
  component: CDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="Drawer Title">
        <Typography>This is the drawer content.</Typography>
        <Typography>You can add any content here.</Typography>
      </CDrawer>
    </>
  );
};

export const WithForm = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form data:', Object.fromEntries(formData));
    alert('Form submitted!');
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add New Item
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="Add New Item">
        <Form
          fields={[
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea', multiline: true, rows: 4 },
            {
              name: 'category',
              label: 'Category',
              type: 'select',
              options: [
                { label: 'Work', value: 'work' },
                { label: 'Personal', value: 'personal' },
                { label: 'Other', value: 'other' },
              ],
            },
            { name: 'priority', label: 'High Priority', type: 'switch' },
          ]}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          submitText="Add Item"
        />
      </CDrawer>
    </>
  );
};

export const WithList = () => {
  const [open, setOpen] = useState(false);

  const items = [
    { id: 1, title: 'Item 1', description: 'Description for item 1' },
    { id: 2, title: 'Item 2', description: 'Description for item 2' },
    { id: 3, title: 'Item 3', description: 'Description for item 3' },
    { id: 4, title: 'Item 4', description: 'Description for item 4' },
    { id: 5, title: 'Item 5', description: 'Description for item 5' },
  ];

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        View Items
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="Items List">
        <List>
          {items.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText primary={item.title} secondary={item.description} />
            </ListItem>
          ))}
        </List>
      </CDrawer>
    </>
  );
};

export const CustomWidth = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Wide Drawer (80%)
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="Wide Drawer" width={80}>
        <Typography variant="h6" gutterBottom>
          This drawer takes up 80% of the viewport width
        </Typography>
        <Typography>
          You can customize the width by passing a width prop (in viewport width percentage).
        </Typography>
      </CDrawer>
    </>
  );
};

export const NarrowDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Narrow Drawer (30%)
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="Narrow Drawer" width={30}>
        <Typography>This is a narrow drawer.</Typography>
      </CDrawer>
    </>
  );
};

export const NoAutoClose = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Drawer (No Auto Close)
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="No Auto Close" autoClose={false}>
        <Typography gutterBottom>
          This drawer won't close when clicking on the backdrop.
        </Typography>
        <Typography>You must click the X button to close it.</Typography>
      </CDrawer>
    </>
  );
};

export const WithCustomTitle = () => {
  const [open, setOpen] = useState(false);

  const customTitle = (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="h6" color="primary">
        Custom Title Component
      </Typography>
    </Box>
  );

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <CDrawer open={open} setOpen={setOpen} title={customTitle}>
        <Typography>This drawer has a custom React node as the title.</Typography>
      </CDrawer>
    </>
  );
};

export const LongContent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Drawer with Long Content
      </Button>
      <CDrawer open={open} setOpen={setOpen} title="Long Content Drawer">
        {Array.from({ length: 50 }, (_, i) => (
          <Box key={i} mb={2}>
            <Typography variant="h6">Section {i + 1}</Typography>
            <Typography>
              This is section {i + 1} with some content. The drawer body is scrollable,
              while the title remains sticky at the top.
            </Typography>
          </Box>
        ))}
      </CDrawer>
    </>
  );
};
