import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { Server } from "http";
import { useState } from "react";
import { FaCircle, FaDatabase } from "react-icons/fa";
import { useQuery } from "react-query";
import { api } from "../services/api";

interface ServersData {
  totalServers: Number;
  downServers: Number;
  problems: Number;
}

interface generatePanelData {
  data: Number;
  title: String;
}

type imgUrlType = "/servers-error.svg" | "/servers-alert.svg" | "/servers-ok.svg";
type textColorType = "#1f993e" | "#EFC41A" | "#ed6161";

export function Servers() {
  const { data, isFetching, isError } = useQuery("servers", fetchData);

  async function fetchData() {
    const data = (await api.get<ServersData>("/servers")).data;
    return data;
  }

  return (
    <Card sx={{ maxHeight: "100%" }}>
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
            <Box width="50%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" color="#0082e5">
              <img src="server.png" alt="Image Server" style={{ maxHeight: "120px", marginTop: "16px" }} />
              <Typography variant="h1" mt={2} fontFamily="monospace">
                {data?.totalServers}
              </Typography>
              <Typography variant="h5" fontWeight="500" display="flex" alignItems="center" gap={1}>
                <FaCircle /> ONLINE
              </Typography>
            </Box>
            <Box width="50%" display="flex" flexDirection="column" justifyContent="center" gap={3} color="#E90000">
              <InfoPanel data={data.downServers} title="SERVERS DOWN" />
              <InfoPanel data={data.problems} title="PROBLEMS" />
            </Box>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

function InfoPanel({ data, title }: generatePanelData) {
  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1" fontFamily="monospace">
        {data}
      </Typography>
      <Typography variant="h5" fontWeight="500">
        {title}
      </Typography>
    </Box>
  );
}
