import { Grid } from "@mui/material";
import { CpuMemory } from "../components/Cpumemory";
import { DiscPartitionUsage } from "../components/DiscPartitionUsage";
import { GroupsProblems } from "../components/GroupsProblems";
import { Problems } from "../components/Problems";
import { Servers } from "../components/Servers";

export default function Home() {
  return (
    <Grid container alignItems="stretch" spacing={2} padding={2}>
      <Grid item xl={4} md={4} sm={6} xs={12}>
        <Servers />
      </Grid>
      <Grid item xl={8} md={4} sm={6} xs={12}>
        <Problems />
      </Grid>
      <Grid item xl={4} md={4} sm={6} xs={12}>
        <CpuMemory />
      </Grid>
      <Grid item xl={4} md={6} sm={6} xs={12}>
        <DiscPartitionUsage />
      </Grid>
      <Grid item xl={4} md={6} sm={12} xs={12}>
        <GroupsProblems />
      </Grid>
    </Grid>
  );
}