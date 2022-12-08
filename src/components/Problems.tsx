import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function Problems() {
  const columns = [
    {
      field: "apn",
      headerName: "APN",
      flex: 1,
    },
    {
      field: "value",
      headerName: "VALUE",
      flex: 1,
    },
    {
      field: "average",
      headerName: "AVERAGE",
      flex: 1,
    },
    {
      field: "deviation",
      headerName: "DEVIATION",
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

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Problems" />
      <Divider />
      <CardContent>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
          disableDensitySelector
          rowsPerPageOptions={[5]}
          getRowId={() => Math.random()}
        />
      </CardContent>
    </Card>
  );
}
