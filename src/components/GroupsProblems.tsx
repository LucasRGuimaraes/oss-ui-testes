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
      renderCell: (params) => {
        if (params.row.groupName === "DataBase" || params.row.groupName === "Hosts") {
          return <Typography sx={{ color: "#FFFF" }}>{params.value}</Typography>;
        }
      },
    },
    {
      field: "priority",
      headerName: "PRIORITY",
      flex: 1,
      renderCell: (params) => {
        if (params.row.groupName === "DataBase" || params.row.groupName === "Hosts") {
          return <Typography sx={{ color: "#FFFF" }}>{params.value}</Typography>;
        }
      },
    },
    {
      field: "hostQuantity",
      headerName: "HOSTS QUANTITY",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        if (params.row.groupName === "DataBase" || params.row.groupName === "Hosts") {
          return <Typography sx={{ color: "#FFFF" }}>{params.value}</Typography>;
        }
      },
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
          <DataGrid
            sx={{
              maxHeight: 275,
              width: "100%",
              "& .red": { bgcolor: "#E94235", color: "white" },
              "& .red:hover": { bgcolor: "#E94235", filter: "brightness(0.8)" },
            }}
            getRowId={() => Math.random()}
            density="compact"
            disableColumnMenu
            disableSelectionOnClick
            disableDensitySelector
            pageSize={10}
            columns={columns}
            rows={data}
            getRowClassName={(params) => {
              if (params.row.groupName === "DataBase" || params.row.groupName === "Hosts") {
                return "red";
              }
              return "";
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
