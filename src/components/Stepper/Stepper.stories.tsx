import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './index';
import { useState } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import Form from '../Form';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Personal Info',
      content: (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Enter Your Personal Information
          </Typography>
          <Typography>Please provide your basic details.</Typography>
        </Box>
      ),
    },
    {
      title: 'Account Details',
      content: (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Create Your Account
          </Typography>
          <Typography>Choose a username and password.</Typography>
        </Box>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Confirm Your Information
          </Typography>
          <Typography>Review and confirm your details.</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Stepper steps={steps} activeStep={activeStep} />
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export const WithSubtitles = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Select Campaign',
      subtitle: 'Choose your marketing campaign',
      content: (
        <Box p={3}>
          <Typography>Select the campaign you want to work with.</Typography>
        </Box>
      ),
    },
    {
      title: 'Create Ad Group',
      subtitle: 'Set up your ad group',
      content: (
        <Box p={3}>
          <Typography>Configure your ad group settings.</Typography>
        </Box>
      ),
    },
    {
      title: 'Create Ads',
      subtitle: 'Design your advertisements',
      content: (
        <Box p={3}>
          <Typography>Create and customize your ads.</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Stepper steps={steps} activeStep={activeStep} />
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Stack>
    </Box>
  );
};

export const WithIcons = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Account',
      icon: <Icon icon="mdi:account" />,
      content: (
        <Box p={3}>
          <Typography variant="h6">Account Setup</Typography>
          <Typography>Create your account.</Typography>
        </Box>
      ),
    },
    {
      title: 'Profile',
      icon: <Icon icon="mdi:card-account-details" />,
      content: (
        <Box p={3}>
          <Typography variant="h6">Profile Details</Typography>
          <Typography>Complete your profile.</Typography>
        </Box>
      ),
    },
    {
      title: 'Verification',
      icon: <Icon icon="mdi:shield-check" />,
      content: (
        <Box p={3}>
          <Typography variant="h6">Verify Account</Typography>
          <Typography>Verify your email address.</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Stepper steps={steps} activeStep={activeStep} />
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export const WithForms = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const steps = [
    {
      title: 'Personal Info',
      content: (
        <Box p={3}>
          <Form
            component="div"
            fields={[
              {
                name: 'firstName',
                label: 'First Name',
                type: 'text',
                value: formData.firstName,
                onChange: (e: any) => setFormData({ ...formData, firstName: e.target.value }),
              },
              {
                name: 'lastName',
                label: 'Last Name',
                type: 'text',
                value: formData.lastName,
                onChange: (e: any) => setFormData({ ...formData, lastName: e.target.value }),
              },
            ]}
          />
        </Box>
      ),
    },
    {
      title: 'Contact',
      content: (
        <Box p={3}>
          <Form
            component="div"
            fields={[
              {
                name: 'email',
                label: 'Email',
                type: 'email',
                value: formData.email,
                onChange: (e: any) => setFormData({ ...formData, email: e.target.value }),
              },
            ]}
          />
        </Box>
      ),
    },
    {
      title: 'Review',
      content: (
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Review Your Information
          </Typography>
          <Typography>
            <strong>Name:</strong> {formData.firstName} {formData.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {formData.email}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Stepper steps={steps} activeStep={activeStep} />
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={activeStep === steps.length - 1}>
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Stack>
    </Box>
  );
};

export const MultipleSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = Array.from({ length: 6 }, (_, i) => ({
    title: `Step ${i + 1}`,
    subtitle: `Description for step ${i + 1}`,
    content: (
      <Box p={3}>
        <Typography variant="h6">Step {i + 1} Content</Typography>
        <Typography>This is the content for step {i + 1}.</Typography>
      </Box>
    ),
  }));

  return (
    <Box>
      <Stepper steps={steps} activeStep={activeStep} />
      <Stack direction="row" spacing={2} mt={3} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};
