import { Icon } from "@iconify/react";
import { Button, Stack } from "@mui/material";

type Color =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "inherit";

type ButtonProps = {
  title?: string;
  text?: string;
  icon?: string;
  disabled?: boolean;
  onClick: () => void;
  color?: Color;
  variant?: "text" | "outlined" | "contained";
};

export default function RowActions({
  buttons = [],
}: {
  buttons: ButtonProps[];
}) {
  return (
    <Stack direction="row" spacing={1}>
      {buttons.map(({ title, text, icon, ...props }, index) => (
        <Button
          variant="outlined"
          {...props}
          key={index}
          startIcon={icon && <Icon icon={icon} />}
        >
          {text || title}
        </Button>
      ))}
    </Stack>
  );
}
