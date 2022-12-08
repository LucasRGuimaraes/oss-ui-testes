import { Card, CardContent, CardHeader, Divider } from "@mui/material";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "severity",
    headerName: "Severity",
    width: 150,
    editable: true,
  },
  {
    field: "hostsQuantity",
    headerName: "Hosts Quantity",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "Storage", severity: "Severe", hostsQuantity: 1 },
  { id: 2, name: "Prometheus", severity: "Medium", hostsQuantity: 3 },
  { id: 3, name: "Routers", severity: "Server", hostsQuantity: 1 },
  { id: 4, name: "Backup", severity: "Low", hostsQuantity: 2 },
  { id: 5, name: "DNS", severity: "Medium", hostsQuantity: 4 },
];

export function GroupsProblems() {
  return (
    <Card sx={{ height: 400 }}>
      <CardHeader title="Groups" />
      <Divider />
      <CardContent>
        <Box sx={{ height: "100%", width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
