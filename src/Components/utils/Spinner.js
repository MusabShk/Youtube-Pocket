import { Container, Grid, Toolbar } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Container>
      <Toolbar />
      <Toolbar />
      <Grid container justifyContent="center">
        <Grid item>
          <CircularProgress sx={{ color: "red" }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Spinner;
