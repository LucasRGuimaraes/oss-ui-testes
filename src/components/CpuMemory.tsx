import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../services/api";

import { formatPercentage } from "../utils/formatNumber";

interface cpuMemoryUsageData {
  host: String;
  type: String;
  usagePercent: Number;
  startTime: Date;
}

export function CpuMemory() {
  const { data, isFetching, isError } = useQuery("cpuMemoryUsage", fetchData);

  const [topCpuUsage, setTopCpuUsage] = useState<Number>(0);
  const [topMemoryUsage, setTopMemoryUsage] = useState<Number>(0);

  async function fetchData() {
    const data = (await api.get<cpuMemoryUsageData[]>("/cpu-memory-usage?_sort=usagePercent&_order=desc")).data;
    const formattedDate = data.map((item) => {
      return {
        ...item,
        duration: moment(item.startTime).fromNow(true),
        usagePercent: formatPercentage(item.usagePercent),
        percentage: item.usagePercent,
      };
    });

    data.forEach((item) => {
      if (item.type === "CPU") {
        setTopCpuUsage((current) => (current > item.usagePercent ? current : item.usagePercent));
      } else if (item.type === "Memory") {
        setTopMemoryUsage((current) => (current > item.usagePercent ? current : item.usagePercent));
      }
    });

    return formattedDate;
  }

  const columns: Array<GridColDef> = [
    {
      field: "host",
      headerName: "HOST",
      flex: 1,
      renderCell: (params) => {
        if (
          (params.row.type === "Memory" && params.row.percentage === topMemoryUsage) ||
          (params.row.type === "CPU" && params.row.percentage === topCpuUsage)
        ) {
          return <Typography sx={{ color: "#FFFF"}}>{params.value}</Typography>;
        }
        
      },
    },
    {
      field: "type",
      headerName: "TYPE",
      flex: 1,
      renderCell: (params) => {
        if (
          (params.row.type === "Memory" && params.row.percentage === topMemoryUsage) ||
          (params.row.type === "CPU" && params.row.percentage === topCpuUsage)
        ) {
          return <Typography sx={{ color: "#FFFF"}}>{params.value}</Typography>;
        }
        
      },
    },
    {
      field: "usagePercent",
      headerName: "USAGE %",
      flex: 1,
      renderCell: (params) => {
        if (
          (params.row.type === "Memory" && params.row.percentage === topMemoryUsage) ||
          (params.row.type === "CPU" && params.row.percentage === topCpuUsage)
        ) {
          return <Typography sx={{ color: "#FFFF"}}>{params.value}</Typography>;
        }
        
      },
    },
    {
      field: "duration",
      headerName: "DURATION",
      flex: 1,
      renderCell: (params) => {
        if (
          (params.row.type === "Memory" && params.row.percentage === topMemoryUsage) ||
          (params.row.type === "CPU" && params.row.percentage === topCpuUsage)
        ) {
          return <Typography sx={{ color: "#FFFF"}}>{params.value}</Typography>;
        }
        
      },
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title={`CPU: ${formatPercentage(topCpuUsage)} | Memory: ${formatPercentage(topMemoryUsage)}`} />
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
            sx={{
              maxHeight: 275,
              width: "100%",
              "& .red": { bgcolor: "red", color: "white" },
              "& .red:hover": { bgcolor: "red", filter: "brightness(0.8)" },
            }}
            getRowId={() => Math.random()}
            density="compact"
            disableColumnMenu
            disableSelectionOnClick
            disableDensitySelector
            pageSize={10}
            columns={columns}
            rows={data}
            getRowClassName={(params) => {
              if (
                (params.row.type === "Memory" && params.row.percentage === topMemoryUsage) ||
                (params.row.type === "CPU" && params.row.percentage === topCpuUsage)
              ) {
                return "red";
              }
              return "";
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
