import { IconButton, Tooltip, IconButtonProps } from "@mui/material";
import { MouseEventHandler, ReactChild, ReactElement, ReactFragment, ReactPortal } from "react";

interface IconTooltipProps {
  title: boolean | ReactChild | ReactFragment | ReactPortal;
  icon: ReactElement;
  button?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  iconButtonProps?: IconButtonProps;
}

export function IconTooltip({ title, icon, button = false, onClick, iconButtonProps }: IconTooltipProps) {
  if (button && onClick) {
    return (
      <IconButton onClick={onClick} {...iconButtonProps}>
        <Tooltip title={title}>
          <label style={{ cursor: button ? "pointer" : "default" }}>{icon}</label>
        </Tooltip>
      </IconButton>
    );
  }
  return (
    <Tooltip title={title}>
      <label style={{ cursor: button ? "pointer" : "default" }}>{icon}</label>
    </Tooltip>
  );
}
