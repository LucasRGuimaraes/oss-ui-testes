import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridCell, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { api } from "../services/api"

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
        return params.value == "high" ?(
          <Typography sx={{"color": "red"}}>
            {params.value}
          </Typography>
        ) : (
          <Typography sx={{"color": "red", "borderColor": "red"}}>
            {params.value}
          </Typography>
        );
      }   
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
  }, []);


  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Groups" />
      <Divider />
      <CardContent>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
