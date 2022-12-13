import { Card, CardContent, CardHeader, Divider, Grid, styled, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import moment from "moment";
import { useQuery } from "react-query";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Radar, Legend } from "recharts";
import { api } from "../services/api";

interface DiscPartitionUsageData {
  date: Date;
  ateCinquenta: Number;
  ateSetentaECinco: Number;
  ateNoventa: Number;
  ateCem: Number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function DiscPartitionUsage() {
  const { data, isFetching, isError } = useQuery("discPartitionUsage", fetchData);

  async function fetchData() {
    const data = (await api.get<DiscPartitionUsageData[]>("disk-partition-usage")).data;
    const formattedDate = data.map((item) => {
      return { ...item, date: moment(item.date).format("dddd HH:mm") };
    });
    return formattedDate;
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Disc Partitions Usage" />
      <Divider />
      <CardContent>
        {isError || isFetching || !data || !data.length ? (
          <Box
            sx={{
              p: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isError && <Typography>Unable to fetch data, please try again</Typography>}
            {isFetching && <Typography>Fetching data...</Typography>}
            {!isFetching && !isError && (!data || !data.length) && <Typography>No entries found!</Typography>}
          </Box>
        ) : (
          <Grid container alignItems="stretch" spacing={2}>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" height="100%" minHeight={150} maxHeight={200}>
                <AreaChart
                  data={data}
                  margin={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="ateCinquenta" stroke="#4285F4" fill="#4285F4" fillOpacity={0.8} stackId="1" name="until 50%" />
                  <Area type="monotone" dataKey="ateSetentaECinco" stroke="#34A853" fill="#34A853" fillOpacity={0.8} stackId="1" name="until 75%" />
                  <Area type="monotone" dataKey="ateNoventa" stroke="#FABB05" fill="#FABB05" fillOpacity={0.8} stackId="1" name="until 90%" />
                  <Area type="monotone" dataKey="ateCem" stroke="#E94235" fill="#E94235" fillOpacity={0.8} stackId="1" name="until 100%" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ backgroundColor: "#FABB05", color: "#ffffff" }}>
                <Typography variant="h4">258 Days</Typography>
                <Typography>Estimated to fill the disk</Typography>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ backgroundColor: "#E94235", color: "#ffffff" }}>
                <Typography variant="h4">1 Host</Typography>
                <Typography>With unexpected growth.</Typography>
              </Item>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
