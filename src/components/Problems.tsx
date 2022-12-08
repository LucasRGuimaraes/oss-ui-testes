import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import moment from "moment";
import { useQuery } from "react-query";
import {
  FiEdit,
  FiTrash2,
  FiAlertTriangle,
  FiCheckSquare,
} from "react-icons/fi";
import { api } from "../services/api";

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
    const data = (await api.get("/problems")).data;
    const formattedDate = data.map((item: ProblemData) => {
      return {
        ...item,
        startTime: moment(item.startTime).format("DD/MM HH:mm:ss"),
        resolvedTime: moment(item.resolvedTime).format("DD/MM HH:mm:ss"),
        duration: moment(item.duration).format("DD/MM HH:mm:ss"),
      };
    });
    return formattedDate;
  }

  const columns = [
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
      renderCell: (params: any) => {
        return params.value === true ? (
          <Typography color="error">
            <FiAlertTriangle /> PROBLEM
          </Typography>
        ) : (
          <Typography color="primary">
            <FiCheckSquare /> Resolved
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
      getActions: (params: any) => [
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
          experimentalFeatures={{ newEditingApi: true }}
        />
      </CardContent>
    </Card>
  );
}
