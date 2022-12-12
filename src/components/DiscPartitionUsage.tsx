import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { PolarGraphic } from "./PolarGraphic";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function DiscPartitionUsage() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Disc Partitions Usage" />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PolarGraphic />
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography>78 Days</Typography>
              <Typography>Estimated to fill the disk</Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Typography color="red">1 Host</Typography>
              <Typography>With unexpected growth</Typography>
            </Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
