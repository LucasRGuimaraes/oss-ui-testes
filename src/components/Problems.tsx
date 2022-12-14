import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridActionsColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { FiEdit, FiTrash2, FiAlertTriangle, FiCheckSquare } from "react-icons/fi";
import { api } from "../services/api";
import moment from "moment";

interface ProblemData {
  startTime: Date;
  clearTime?: Date;
  status: String;
  host: String;
  problemDescription: String;
  duration: Date;
  severity: String;
}

export function Problems() {
  const { data, isFetching, isError } = useQuery("problems", fetchData);

  async function fetchData() {
    const data = (await api.get<ProblemData[]>("/problems")).data;
    const formattedDate = data.map((item) => {
      if (item.clearTime) {
        return {
          ...item,
          startTime: moment(item.startTime).format("DD/MM HH:mm:ss"),
          clearTime: item.clearTime && moment(item.clearTime).format("DD/MM HH:mm:ss"),
          duration: moment(moment(item.startTime)).from(moment(item.clearTime), true),
        };
      } else {
        return {
          ...item,
          startTime: moment(item.startTime).format("DD/MM HH:mm:ss"),
          clearTime: item.clearTime && moment(item.clearTime).format("DD/MM HH:mm:ss"),
          duration: moment(item.startTime).fromNow(true),
        };
      }
    });

    return formattedDate;
  }

  const columns: Array<GridColDef | GridActionsColDef> = [
    {
      field: "startTime",
      headerName: "START TIME",
      flex: 1,
    },
    {
      field: "clearTime",
      headerName: "CLEAR TIME",
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params) => {
        if (params.value === "Problem") {
          return (
            <Typography color="#E94235">
              <FiAlertTriangle /> {params.value}
            </Typography>
          );
        } else if (params.value === "Alert") {
          return (
            <Typography color="#FABB05">
              <FiAlertTriangle /> {params.value}
            </Typography>
          );
        } else {
          return (
            <Typography color="#34A853">
              <FiCheckSquare /> {params.value}
            </Typography>
          );
        }
      },
    },
    {
      field: "host",
      headerName: "HOST",
      flex: 1,
    },
    {
      field: "problemDescription",
      headerName: "PROBLEM DESCRIPTION",
      flex: 3,
    },
    {
      field: "duration",
      headerName: "DURATION",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      type: "actions",
      flex: 1,
      getActions: (params: GridRowParams) => [
        // @ts-ignore
        <GridActionsCellItem
          key={1}
          icon={<FiEdit color="#660099" />}
          label="Edit"
          onClick={() => {
            console.log("oi");
          }}
          showInMenu
        />,
        // @ts-ignore
        <GridActionsCellItem
          key={2}
          icon={<FiTrash2 color="#660099" />}
          label="Delete"
          onClick={() => {
            console.log("oi");
          }}
        />,
      ],
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Problems" />
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
