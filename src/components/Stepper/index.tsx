import {
  Box,
  Container,
  Step,
  StepContent,
  StepIcon,
  StepLabel,
  Stepper,
} from "@mui/material";

import React from "react";

interface Step {
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  orientation: "horizontal" | "vertical";
}

export default function CustomStepper({
  steps,
  activeStep,
  orientation = "horizontal",
}: StepperProps) {
  return (
    <Stepper activeStep={activeStep} orientation={orientation}>
      {steps.map(({ title, icon }, index) => {
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
            {icon && <StepIcon icon={icon} />}
            <StepLabel>{title}</StepLabel>
            <StepContent>
              <Box>{steps[activeStep].content}</Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
