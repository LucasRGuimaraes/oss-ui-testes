import { Grid } from "@mui/material";
import { CpuMemory } from "../components/CpuMemory";
import { DiscPartitionUsage } from "../components/DiscPartitionUsage";
import { GroupsProblems } from "../components/GroupsProblems";
import { Problems } from "../components/Problems";
import { Servers } from "../components/Servers";

export default function Home() {
  return (
    <Grid container alignItems="stretch" spacing={2} padding={2}>
      <Grid item md={4} sm={6} xs={12}>
        <Servers />
      </Grid>
      <Grid item md={8} sm={6} xs={12}>
        <Problems />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <CpuMemory />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <DiscPartitionUsage />
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <GroupsProblems />
      </Grid>
    </Grid>
  );
}
