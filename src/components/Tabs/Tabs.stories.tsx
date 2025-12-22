import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './index';
import { useState } from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { Icon } from '@iconify/react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => {
  const [index, setIndex] = useState(0);

  return (
    <Tabs
      index={index}
      setIndex={setIndex}
      tabs={[
        {
          title: 'Profile',
          panel: (
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Typography>This is the profile tab content.</Typography>
            </Box>
          ),
        },
        {
          title: 'Settings',
          panel: (
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Settings
              </Typography>
              <Typography>Configure your settings here.</Typography>
            </Box>
          ),
        },
        {
          title: 'Notifications',
          panel: (
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Typography>Manage your notifications.</Typography>
            </Box>
          ),
        },
      ]}
    />
  );
};

export const WithIcons = () => {
  const [index, setIndex] = useState(0);

  return (
    <Tabs
      index={index}
      setIndex={setIndex}
      tabs={[
        {
          title: 'Dashboard',
          icon: <Icon icon="mdi:view-dashboard" />,
          panel: (
            <Box p={3}>
              <Typography variant="h6">Dashboard</Typography>
              <Typography>Overview of your account.</Typography>
            </Box>
          ),
        },
        {
          title: 'Messages',
          icon: <Icon icon="mdi:message" />,
          panel: (
            <Box p={3}>
              <Typography variant="h6">Messages</Typography>
              <Typography>Your inbox and conversations.</Typography>
            </Box>
          ),
        },
        {
          title: 'Settings',
          icon: <Icon icon="mdi:cog" />,
          panel: (
            <Box p={3}>
              <Typography variant="h6">Settings</Typography>
              <Typography>Configure your preferences.</Typography>
            </Box>
          ),
        },
      ]}
    />
  );
};

export const VerticalTabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <Box style={{ height: '400px' }}>
      <Tabs
        index={index}
        setIndex={setIndex}
        orientation="vertical"
        tabs={[
          {
            title: 'General',
            icon: <Icon icon="mdi:cog" />,
            panel: (
              <Box p={3}>
                <Typography variant="h6">General Settings</Typography>
                <Typography>Basic configuration options.</Typography>
              </Box>
            ),
          },
          {
            title: 'Security',
            icon: <Icon icon="mdi:shield" />,
            panel: (
              <Box p={3}>
                <Typography variant="h6">Security</Typography>
                <Typography>Manage your security settings.</Typography>
              </Box>
            ),
          },
          {
            title: 'Privacy',
            icon: <Icon icon="mdi:lock" />,
            panel: (
              <Box p={3}>
                <Typography variant="h6">Privacy</Typography>
                <Typography>Control your privacy options.</Typography>
              </Box>
            ),
          },
          {
            title: 'Notifications',
            icon: <Icon icon="mdi:bell" />,
            panel: (
              <Box p={3}>
                <Typography variant="h6">Notifications</Typography>
                <Typography>Manage notification preferences.</Typography>
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
};

export const ManyTabs = () => {
  const [index, setIndex] = useState(0);

  const tabs = Array.from({ length: 10 }, (_, i) => ({
    title: `Tab ${i + 1}`,
    panel: (
      <Box p={3}>
        <Typography variant="h6">Tab {i + 1} Content</Typography>
        <Typography>This is the content for tab {i + 1}.</Typography>
      </Box>
    ),
  }));

  return <Tabs index={index} setIndex={setIndex} tabs={tabs} />;
};

export const WithCards = () => {
  const [index, setIndex] = useState(0);

  return (
    <Tabs
      index={index}
      setIndex={setIndex}
      tabs={[
        {
          title: 'Overview',
          panel: (
            <Box p={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Welcome Back!
                  </Typography>
                  <Typography color="text.secondary">
                    Here's what's happening with your projects today.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ),
        },
        {
          title: 'Analytics',
          panel: (
            <Box p={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Analytics
                  </Typography>
                  <Typography color="text.secondary">
                    View detailed analytics and insights.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ),
        },
        {
          title: 'Reports',
          panel: (
            <Box p={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Reports
                  </Typography>
                  <Typography color="text.secondary">
                    Generate and download reports.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ),
        },
      ]}
    />
  );
};
