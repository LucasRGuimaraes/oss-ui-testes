import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useQuery } from "react-query";
import { api } from "../services/api";

interface cpuMemoryUsageData {
  host: String;
  usageCpuPercent: Number;
  usageMemoryPercent: Number;
  startTime: Date;
}

export function CpuMemory() {
  const { data, isFetching, isError } = useQuery("cpuMemoryUsage", fetchData);

  async function fetchData() {
    const data = (await api.get<cpuMemoryUsageData[]>("/cpu-memory-usage")).data;
    const formattedDate = data.map((item) => {
      return {
        ...item,
        startTime: moment(item.startTime).format("DD/MM HH:mm:ss"),
        duration: moment(item.startTime).fromNow(true),
      };
    });
    return formattedDate;
  }

  const columns: Array<GridColDef> = [
    {
      field: "host",
      headerName: "HOST",
      flex: 1,
    },
    {
      field: "usageCpuPercent",
      headerName: "USAGE CPU %",
      flex: 1,
    },
    {
      field: "usageMemoryPercent",
      headerName: "USAGE MEMORY %",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "DURATION",
      flex: 1,
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader>
        <Typography>CPU / MEM</Typography>
      </CardHeader>
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
          <DataGrid
            sx={{ maxHeight: 275, width: "100%" }}
            getRowId={() => Math.random()}
            density="compact"
            disableColumnMenu
            disableSelectionOnClick
            disableDensitySelector
            pageSize={10}
            columns={columns}
            rows={data}
          />
        )}
      </CardContent>
    </Card>
  );
}
