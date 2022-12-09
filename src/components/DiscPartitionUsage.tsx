import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useQuery } from "react-query";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "../services/api";

interface DiscPartitionUsageData {
  date: Date;
  ateCinquenta: Number;
  ateSetentaECinco: Number;
  ateNoventa: Number;
  ateCem: Number;
}

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
              <Area type="monotone" dataKey="ateCinquenta" stroke="#003F5B" fill="#003F5B" fillOpacity={0.8} stackId="1" name="Até 50%" />
              <Area type="monotone" dataKey="ateSetentaECinco" stroke="#A0A4C9" fill="#A0A4C9" fillOpacity={0.8} stackId="1" name="Até 75%" />
              <Area type="monotone" dataKey="ateNoventa" stroke="#FFA603" fill="#FFA603" fillOpacity={0.8} stackId="1" name="Até 90%" />
              <Area type="monotone" dataKey="ateCem" stroke="#FFA603" fill="#FFA603" fillOpacity={0.8} stackId="1" name="Até 100%" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
