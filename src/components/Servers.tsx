import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { api } from "../services/api";

interface ServersData {
  totalServers: Number;
  downServers: Number;
  problems: Number;
}

export function Servers() {
  const { data, isFetching, isError } = useQuery("servers", fetchData);

  async function fetchData() {
    return (await api.get<ServersData>("/servers")).data;
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Servers" />
      <Divider />
      <CardContent sx={{ display: "flex" }}>
        {isError || isFetching || !data ? (
          <Box
            sx={{
              p: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {isError && <Typography>Unable to fetch data, please try again</Typography>}
            {isFetching && <Typography>Fetching data...</Typography>}
            {!isFetching && !isError && !data && <Typography>No entries found!</Typography>}
          </Box>
        ) : (
          <Grid container alignItems="stretch" spacing={2} padding={2}>
            <Box width="50%" display="flex" flexDirection="column" alignItems="center" color="green">
              <img src="/server-img.png" alt="Image Server" style={{ maxHeight: "150px" }} />
              <Typography variant="h1" pt={1} fontFamily="monospace">
                {data?.totalServers}
              </Typography>
              <Typography variant="h5" fontWeight="500" display="flex" alignItems="center" gap={1}>
                <FaCircle /> ONLINE
              </Typography>
            </Box>
            <Box width="50%" display="flex" flexDirection="column" justifyContent="center" gap={3} color="red">
              <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h1" fontFamily="monospace">
                  {data?.downServers}
                </Typography>
                <Typography variant="h5" fontWeight="500">
                  SERVERS DOWN
                </Typography>
              </Box>
              <Box width="100%" display="flex" flexDirection="column" alignItems="center" color="red">
                <Typography variant="h1" fontFamily="monospace">
                  {data?.problems}
                </Typography>
                <Typography variant="h5" fontWeight="500">
                  PROBLEMS
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
