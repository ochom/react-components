import { Card, Grid2 } from "@mui/material";
import React from "react";
import { ErrorPage, PageConstruction } from "../dist";

export default function EmptyPages() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card variant="outlined">
          <ErrorPage title="404" error="Page not found" />
        </Card>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Card variant="outlined">
          <PageConstruction feature="Demo" />
        </Card>
      </Grid2>
    </Grid2>
  );
}
