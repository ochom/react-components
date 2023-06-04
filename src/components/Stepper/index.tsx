import {
  Box,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  SxProps,
} from "@mui/material";

import React from "react";

interface Step {
  title: string;
  content: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
}

export default function CustomStepper({ steps, activeStep }: StepperProps) {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map(({ title }, index) => {
          return (
            <Step
              key={index}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "primary.main", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "grey.500", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "primary.main", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "common.white", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel>{title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box>
        <React.Fragment>{steps[activeStep].content}</React.Fragment>
      </Box>
    </Container>
  );
}
