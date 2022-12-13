import Link from "next/link";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { Alert } from "./Alert";

export default function MyAppBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "#660099" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2 }}>
          <FiMenu />
        </IconButton>
        <Link href="/home" passHref>
          <Typography variant="h5" noWrap component="a" sx={{ cursor: "pointer" }}>
            OSS Smart View
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1, ml: 2 }} />
        <Box>
          <Alert />
          <Button variant="text" color="white">
            <FiLogOut size={20} />
            <Typography sx={{ ml: 1 }}>Logout</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
