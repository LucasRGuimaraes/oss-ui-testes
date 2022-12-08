import { Card, CardContent, CardHeader, Divider } from "@mui/material";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "severity",
    headerName: "Severity",
    flex: 1,
  },
  {
    field: "hostsQuantity",
    headerName: "Hosts Quantity",
    type: "number",
    flex: 1,
  },
];

const rows = [
  { name: "Storage", severity: "Severe", hostsQuantity: 1 },
  { name: "Prometheus", severity: "Medium", hostsQuantity: 3 },
  { name: "Routers", severity: "Server", hostsQuantity: 1 },
  { name: "Backup", severity: "Low", hostsQuantity: 2 },
  { name: "DNS", severity: "Medium", hostsQuantity: 4 },
];

export function GroupsProblems() {
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
            getRowId={() => Math.random()}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
