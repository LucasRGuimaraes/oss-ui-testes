import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function GroupsProblems() {
  const columns: GridColDef[] = [
    {
      field: "groupName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => {
        if (params.value == "high") {
          return <Typography sx={{ color: "red" }}>{params.value}</Typography>;
        } else {
          return <Typography sx={{ color: "orange", borderColor: "red" }}>{params.value}</Typography>;
        }
      },
    },
    {
      field: "hostQuantity",
      headerName: "Hosts Quantity",
      type: "number",
      flex: 1,
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    api
      .get("groups")
      .then((response) => setRows(response.data))
      .catch(() => console.log("A requisição falhou"));
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Groups" />
      <Divider />
      <CardContent>
        <DataGrid rows={rows} columns={columns} pageSize={5} disableSelectionOnClick />
      </CardContent>
    </Card>
  );
}
