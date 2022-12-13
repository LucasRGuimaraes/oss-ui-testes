import moment from "moment";
import { Badge, Box, Chip, Divider, Grid, Popover, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FiCornerUpRight, FiList } from "react-icons/fi";
import { IoNotificationsCircle } from "react-icons/io5";
import { useQuery } from "react-query";
import { IconTooltip } from "../utils/IconTooltip";
import { OverflowText } from "../utils/OverflowText";

interface AlertUser {
  alertId: number;
  type: string;
  message: string;
  occurrenceDate: Date;
  clearDate: Date;
  lastCommentDate: Date;
  lastCommentUser: string;
  lastComment: string;
  isClear: boolean;
}

export function Alert() {
  const route = useRouter();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const data = 36;

  return (
    <>
      <IconTooltip
        iconButtonProps={{
          sx: { background: open ? "rgba(0, 0, 0, 0.15)" : "none" },
          color: open ? "primary" : "default",
          size: "large",
          ref: anchorRef,
        }}
        button
        title="Notifications"
        icon={
          <Badge badgeContent={data} color="error">
            <IoNotificationsCircle color="white" size={33} />
          </Badge>
        }
      />
      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.5,
            overflow: "inherit",
            boxShadow: (theme) => theme.shadows[20],
            border: (theme) => `solid 1px ${theme.palette.grey[500]}`,
            width: 360,
          },
        }}
        open={open}
        anchorEl={anchorRef.current}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Typography variant="h6" color="white.main">
            NOTIFICATIONS
          </Typography>
          <IconTooltip button onClick={() => route.push("/settings/alert/user")} title="LIST ALL" icon={<FiList color="white" size={25} />} />
        </Box>
        <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2">No Notifications</Typography>
        </Box>
      </Popover>
    </>
  );
}
