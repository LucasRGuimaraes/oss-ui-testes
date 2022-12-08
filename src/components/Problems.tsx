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

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Problems" />
      <Divider />
      <CardContent>
        {/* <DataGrid
          // rows={}
          // columns={columns}
          // pageSize={5}
          // autoHeight
          // disableSelectionOnClick
          // disableDensitySelector
          // rowsPerPageOptions={[5]}
          // getRowId={() => Math.random()}
        /> */}
      </CardContent>
    </Card>
  );
}
