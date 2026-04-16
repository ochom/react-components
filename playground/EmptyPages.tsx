import { Card, Grid } from "@mui/material";
import { ErrorPage, PageConstruction } from "../dist";

export default function EmptyPages() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined">
          <ErrorPage title="404" error="Page not found" />
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined">
          <PageConstruction feature="Demo" />
        </Card>
      </Grid>
    </Grid>
  );
}
