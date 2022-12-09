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
              <img src="/server-img.png" alt="Image Server" height="250" />
              <Typography variant="h5" fontWeight="500" display="flex" alignItems="center" gap={1} pt={2}>
                <FaCircle /> ONLINE
              </Typography>
              <Typography variant="h2" pt={1} fontFamily="monospace">
                {data?.totalServers}
              </Typography>
            </Box>
            <Box width="50%" display="flex" flexDirection="column" justifyContent="center" gap={5} color="red">
              <Box width="100%" display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" fontWeight="500" pt={2}>
                  SERVERS DOWN
                </Typography>
                <Typography variant="h2" pt={1} fontFamily="monospace">
                  {data?.downServers}
                </Typography>
              </Box>
              <Box width="100%" display="flex" flexDirection="column" alignItems="center" color="red">
                <Typography variant="h4" fontWeight="500" pt={2}>
                  PROBLEMS
                </Typography>
                <Typography variant="h2" pt={1} fontFamily="monospace">
                  {data?.problems}
                </Typography>
              </Box>
            </Box>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
