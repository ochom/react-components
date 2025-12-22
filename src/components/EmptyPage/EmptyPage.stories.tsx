import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage, PageConstruction } from './index';

const meta: Meta = {
  title: 'Components/EmptyPage',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const ErrorPageBasic: StoryObj<typeof ErrorPage> = {
  render: () => <ErrorPage error="Something went wrong!" />,
};

export const ErrorPageWithCustomTitle: StoryObj<typeof ErrorPage> = {
  render: () => <ErrorPage error="Failed to load data" title="Network Error" />,
};

export const ErrorPageWithObject: StoryObj<typeof ErrorPage> = {
  render: () => (
    <ErrorPage
      error={{ message: 'Connection timeout. Please check your internet connection.' }}
      title="Connection Failed"
    />
  ),
};

export const ErrorPageServerError: StoryObj<typeof ErrorPage> = {
  render: () => (
    <ErrorPage
      error="The server is temporarily unavailable. Please try again later."
      title="500 - Server Error"
    />
  ),
};

export const ErrorPageNotFound: StoryObj<typeof ErrorPage> = {
  render: () => (
    <ErrorPage
      error="The page you are looking for does not exist."
      title="404 - Page Not Found"
    />
  ),
};

export const ConstructionBasic: StoryObj<typeof PageConstruction> = {
  render: () => <PageConstruction />,
};

export const ConstructionWithFeature: StoryObj<typeof PageConstruction> = {
  render: () => <PageConstruction feature="Dashboard Analytics" />,
};

export const ConstructionFullCustom: StoryObj<typeof PageConstruction> = {
  render: () => (
    <PageConstruction
      feature="Advanced Reporting"
      mobile="+1 234 567 8900"
      email="support@example.com"
      color="primary.main"
    />
  ),
};

export const ConstructionMessaging: StoryObj<typeof PageConstruction> = {
  render: () => (
    <PageConstruction
      feature="Real-time Messaging"
      mobile="+44 20 1234 5678"
      email="dev@example.com"
    />
  ),
};

export const ConstructionPayments: StoryObj<typeof PageConstruction> = {
  render: () => (
    <PageConstruction
      feature="Payment Gateway Integration"
      mobile="+61 2 1234 5678"
      email="payments@example.com"
      color="secondary.main"
    />
  ),
};
