import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { api } from "../services/api";

interface GroupsData {
  groupName: String;
  hostQuantity: Number;
  priority: String;
}

export function GroupsProblems() {
  const columns: GridColDef[] = [
    {
      field: "groupName",
      headerName: "NAME",
      flex: 1,
    },
    {
      field: "priority",
      headerName: "PRIORITY",
      flex: 1,
      renderCell: (params) => {
        if (params.value == "high") {
          return <Typography sx={{ color: "red" }}>{params.value}</Typography>;
        } else if (params.value === "medium") {
          return <Typography sx={{ color: "orange", borderColor: "red" }}>{params.value}</Typography>;
        } else {
          return <Typography sx={{ color: "green", borderColor: "red" }}>{params.value}</Typography>;
        }
      },
    },
    {
      field: "hostQuantity",
      headerName: "HOSTS QUANTITY",
      type: "number",
      flex: 1,
    },
  ];

  const { data, isFetching, isError } = useQuery("groups", fetchData);

  async function fetchData() {
    const data = (await api.get<GroupsData[]>("groups")).data;
    return data;
  }

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Groups" />
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
          <DataGrid rows={data} columns={columns} pageSize={5} disableSelectionOnClick />
        )}
      </CardContent>
    </Card>
  );
}
