import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridActionsColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { FiEdit, FiTrash2, FiAlertTriangle, FiCheckSquare } from "react-icons/fi";
import { api } from "../services/api";
import moment from "moment";

interface ProblemData {
  startTime: Date;
  resolvedTime?: Date;
  status: Boolean;
  host: String;
  problemDescription: String;
  duration: Date;
  severity: String;
}

export function Problems() {
  const { data } = useQuery("problems", fetchData);

  async function fetchData() {
    const data = (await api.get<ProblemData[]>("/problems")).data;
    const formattedDate = data.map((item) => {
      return {
        ...item,
        startTime: moment(item.startTime).format("DD/MM HH:mm:ss"),
        resolvedTime: item.resolvedTime && moment(item.resolvedTime).format("DD/MM HH:mm:ss"),
        duration: moment(item.duration).fromNow(true),
      };
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
      field: "resolvedTime",
      headerName: "RESOLVED TIME",
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return params.value ? (
          <Typography color="error">
            <FiAlertTriangle /> PROBLEM
          </Typography>
        ) : (
          <Typography color="primary">
            <FiCheckSquare /> RESOLVED
          </Typography>
        );
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
      flex: 1,
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
          icon={<FiEdit color="#368F54" />}
          label="Edit"
          onClick={() => {
            console.log("oi");
          }}
          showInMenu
        />,
        // @ts-ignore
        <GridActionsCellItem
          icon={<FiTrash2 color="#368F54" />}
          label="Delete"
          onClick={() => {
            console.log("oi");
          }}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Problems" />
      <Divider />
      <CardContent>
        <DataGrid
          rows={data || []}
          columns={columns}
          disableColumnMenu
          disableSelectionOnClick
          disableDensitySelector
          getRowId={() => Math.random()}
          pageSize={5}
          autoHeight
        />
      </CardContent>
    </Card>
  );
}
