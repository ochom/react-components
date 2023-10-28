import type { Meta, StoryObj } from "@storybook/react";

import CustomStepper from "../components/Stepper"; 


const meta: any = {
  title: "Example/Stepper",
  component: CustomStepper,
  parameters: {
    layout: "centered",
  }, 
  tags: ["autodocs"], 
} satisfies Meta<typeof CustomStepper>;

export default meta;


type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { 
    steps: []
  },
};