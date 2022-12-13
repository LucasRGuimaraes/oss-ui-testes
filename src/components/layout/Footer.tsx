import { Box, Stack, Typography, useTheme } from "@mui/material";
import moment from "moment";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        padding: "5px 15px",
        position: "fixed",
        color: "#FFF",
        backgroundColor: "#660099",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography>Copyright Vertis Solutions © {moment().format("YYYY")}</Typography>
        </Box>
        <Box>
          <Typography>v 1.1</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
