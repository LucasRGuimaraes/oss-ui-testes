import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { api } from "../services/api";
interface ServersData {
  totalServers: Number;
  downServers: Number;
  problems: Number;
}

export function Servers() {
  const { data } = useQuery("servers", fetchData);

  async function fetchData() {
    return (await api.get<ServersData>("/servers")).data;
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Servers" />
      <Divider />
      <CardContent sx={{ display: "flex" }}>
        <Grid container alignItems="stretch" spacing={2} padding={2}>
          <Box justifyContent="center">
            <img src="./server-img.png" alt="Image Server" height="200" />
            <Typography
              color="green"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FaCircle /> ONLINE
            </Typography>
            <Typography>{data?.totalServers}</Typography>
          </Box>
          <Box>
            <Box>
              <Typography>SERVERS DOWN</Typography>
              <Typography>{data?.downServers}</Typography>
            </Box>
            <Box>
              <Typography>PROBLEMS</Typography>
              <Typography>{data?.problems}</Typography>
            </Box>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
}
