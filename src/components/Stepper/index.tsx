import { Container, Paper, Step, StepLabel, Stepper } from "@mui/material";

import React from "react";

export interface StepperProps {
  steps: string[];
  activeStep: number;
  pages: React.ReactNode[];
}

export default function CustomStepper({
  steps,
  activeStep,
  pages,
}: StepperProps) {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
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
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Paper sx={{ mt: 5, px: 3, pt: 2, pb: 5 }}>
        <React.Fragment>{pages[activeStep]}</React.Fragment>
      </Paper>
    </Container>
  );
}
