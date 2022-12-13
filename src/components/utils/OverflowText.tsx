import { Tooltip, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface OverflowText extends TypographyProps {
  text: string;
  width?: number;
}

export function OverflowText({ text, width, ...rest }: OverflowText) {
  return (
    <Tooltip title={text}>
      <Typography
        {...rest}
        sx={{
          width,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
}
