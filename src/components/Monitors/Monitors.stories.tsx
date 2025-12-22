import type { Meta, StoryObj } from '@storybook/react';
import { CircularLoader, BarLoader } from './index';
import { Box } from '@mui/material';

const meta: Meta = {
  title: 'Components/Loaders',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const CircularDefault: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader />,
};

export const CircularSmall: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader size={24} />,
};

export const CircularLarge: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader size={60} />,
};

export const CircularWithColor: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader color="secondary" />,
};

export const CircularPrimary: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader color="primary" size={40} />,
};

export const CircularSuccess: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader color="success" size={40} />,
};

export const CircularError: StoryObj<typeof CircularLoader> = {
  render: () => <CircularLoader color="error" size={40} />,
};

export const BarDefault: StoryObj<typeof BarLoader> = {
  render: () => (
    <Box width={400}>
      <BarLoader />
    </Box>
  ),
};

export const BarWithColor: StoryObj<typeof BarLoader> = {
  render: () => (
    <Box width={400}>
      <BarLoader color="secondary" />
    </Box>
  ),
};

export const BarPrimary: StoryObj<typeof BarLoader> = {
  render: () => (
    <Box width={400}>
      <BarLoader color="primary" />
    </Box>
  ),
};

export const BarSuccess: StoryObj<typeof BarLoader> = {
  render: () => (
    <Box width={400}>
      <BarLoader color="success" />
    </Box>
  ),
};

export const BarError: StoryObj<typeof BarLoader> = {
  render: () => (
    <Box width={400}>
      <BarLoader color="error" />
    </Box>
  ),
};

export const BothLoaders: StoryObj = {
  render: () => (
    <Box>
      <CircularLoader />
      <Box width={400} mt={2}>
        <BarLoader />
      </Box>
    </Box>
  ),
};
