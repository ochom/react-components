import { Icon } from "@iconify/react";
import { Button, ButtonProps, Stack } from "@mui/material";

type Color =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "inherit";

type ActionButtonProps = {
  title?: string;
  text?: string;
  icon?: string;
  disabled?: boolean;
  onClick: () => void;
  color?: Color;
  variant?: "text" | "outlined" | "contained";
  buttonProps?: ButtonProps;
};

export function RowActions({ buttons = [] }: { buttons: ActionButtonProps[] }) {
  return (
    <Stack direction="row" spacing={1}>
      {buttons.map((props, index) => {
        const { title, text, icon, disabled, onClick, color } = props;
        return (
          <Button
            variant="outlined"
            key={index}
            startIcon={icon && <Icon icon={icon} />}
            color={color}
            disabled={disabled}
            onClick={onClick}
            {...props.buttonProps}
          >
            {text || title}
          </Button>
        );
      })}
    </Stack>
  );
}
